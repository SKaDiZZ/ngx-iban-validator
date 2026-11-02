import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  applyUpdates,
  compareData,
  formatReport,
  mod97,
  parseIbanStructureHtml,
  readLocalPackageData,
  validateIbanMod97,
} from "./check-iban-structure.js";

const sampleHtml = `
<!DOCTYPE html>
<html>
<body>
<div class="register structure">
<table>
  <thead>
    <tr>
      <th>Country</th><th>Code</th><th>SEPA</th><th>Length</th><th>Account Check</th><th>Branch</th><th>IBAN Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Albania</td>
      <td>AL</td>
      <td>Yes</td>
      <td>28</td>
      <td></td>
      <td></td>
      <td>AL35202111090000000001234567</td>
    </tr>
    <tr>
      <td>Newland</td>
      <td>NLX</td>
      <td>No</td>
      <td>20</td>
      <td></td>
      <td></td>
      <td>invalid code ignored</td>
    </tr>
    <tr>
      <td>Zanziland</td>
      <td>ZZ</td>
      <td>No</td>
      <td>20</td>
      <td></td>
      <td></td>
      <td>ZZ611904300234573201</td>
    </tr>
    <tr>
      <td>Germany</td>
      <td>DE</td>
      <td>Yes</td>
      <td>24</td>
      <td></td>
      <td></td>
      <td>DE755121080012451261990000</td>
    </tr>
  </tbody>
</table>
</div>
</body>
</html>
`;

describe("IBAN Checker Script", () => {
  describe("validateIbanMod97", () => {
    it("should correctly validate valid IBAN checksums", () => {
      assert.equal(validateIbanMod97("AL35202111090000000001234567"), true);
      assert.equal(validateIbanMod97("DE75512108001245126199"), true);
      assert.equal(validateIbanMod97("AT483200000012345864"), true);
    });

    it("should reject invalid IBAN checksums", () => {
      assert.equal(validateIbanMod97("AL35202111090000000001234568"), false);
      assert.equal(validateIbanMod97(""), false);
      assert.equal(validateIbanMod97("INVALID"), false);
    });
  });

  describe("parseIbanStructureHtml", () => {
    it("should extract valid country entries from HTML table", () => {
      const result = parseIbanStructureHtml(sampleHtml);
      assert.equal(result.size, 3); // AL, ZZ, DE (NLX ignored because 3 letters)
      assert.equal(result.get("AL").country, "Albania");
      assert.equal(result.get("AL").length, 28);
      assert.equal(result.get("AL").example, "AL35202111090000000001234567");
      assert.equal(result.get("ZZ").country, "Zanziland");
      assert.equal(result.get("ZZ").length, 20);
      assert.equal(result.get("DE").length, 24);
    });

    it("should throw error if <tbody> is missing", () => {
      assert.throws(() => parseIbanStructureHtml("<html><body>No table</body></html>"), {
        message: /Could not find <tbody>/,
      });
    });
  });

  describe("compareData", () => {
    it("should detect new countries, changed lengths, and local-only countries", () => {
      const remoteMap = parseIbanStructureHtml(sampleHtml);
      const mockLocalData = {
        codeLengths: new Map([
          ["AL", 28], // Matching
          ["DE", 22], // Changed length: remote has 24, local has 22
          ["FR", 27], // Local only (not in remote sample)
        ]),
        supportedCountries: new Map([
          ["AL", { num: 1, country: "Albania", code: "AL", length: 28 }],
          ["DE", { num: 2, country: "Germany", code: "DE", length: 22 }],
          ["FR", { num: 3, country: "France", code: "FR", length: 27 }],
        ]),
        docsCountries: new Map([
          ["AL", { num: 1, country: "Albania", code: "AL", length: 28 }],
          ["DE", { num: 2, country: "Germany", code: "DE", length: 22 }],
          ["FR", { num: 3, country: "France", code: "FR", length: 27 }],
        ]),
        testCases: new Map([
          ["AL", { titleCountry: "Albania", titleIban: "AL...", value: "AL35202111090000000001234567" }],
          ["DE", { titleCountry: "Germany", titleIban: "DE...", value: "DE75512108001245126199" }],
          ["FR", { titleCountry: "France", titleIban: "FR...", value: "FR7630006000011234567890189" }],
        ]),
      };

      const comparison = compareData(remoteMap, mockLocalData);

      assert.equal(comparison.hasDifferences, true);
      assert.equal(comparison.newCountries.length, 1);
      assert.equal(comparison.newCountries[0].code, "ZZ");
      assert.equal(comparison.changedLengths.length, 1);
      assert.equal(comparison.changedLengths[0].code, "DE");
      assert.equal(comparison.changedLengths[0].localLength, 22);
      assert.equal(comparison.changedLengths[0].remoteLength, 24);
      assert.equal(comparison.localOnly.length, 1);
      assert.equal(comparison.localOnly[0].code, "FR");
    });
  });

  describe("formatReport", () => {
    it("should format report string with summary information", () => {
      const mockComparison = {
        remoteCount: 3,
        localCount: 3,
        newCountries: [{ code: "ZZ", country: "Zanziland", length: 20, example: "ZZ123" }],
        changedLengths: [{ code: "DE", country: "Germany", localLength: 22, remoteLength: 24, example: "DE123" }],
        localOnly: [{ code: "FR", country: "France", length: 27 }],
        internalDiscrepancies: [],
        hasDifferences: true,
        hasDiscrepancies: false,
      };

      const report = formatReport(mockComparison, { source: "test" });
      assert.match(report, /IBAN Structure Comparison Report/);
      assert.match(report, /Zanziland/);
      assert.match(report, /Germany/);
      assert.match(report, /Differences detected/);
    });
  });

  describe("applyUpdates on mock workspace", () => {
    it("should update files accurately without corrupting existing countries", () => {
      const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "iban-sync-test-"));

      // Setup directory structure
      fs.mkdirSync(path.join(tempDir, "packages/ngx-iban-validator/src/__tests__"), { recursive: true });
      fs.mkdirSync(path.join(tempDir, "apps/docs/src/content/docs/reference"), { recursive: true });

      // Write initial files
      const codeLengthsFile = path.join(tempDir, "packages/ngx-iban-validator/src/code-lengths.ts");
      fs.writeFileSync(codeLengthsFile, "export const CODE_LENGTHS = {\n  AL: 28,\n  FR: 27,\n};\n", "utf-8");

      const supportedMdFile = path.join(tempDir, "SUPPORTED_COUNTRIES.md");
      fs.writeFileSync(
        supportedMdFile,
        "# Supported countries\n\n| No | Country | Country Code | Length |\n| --- | --- | --- | --- |\n| 1 | Albania | AL | 28 |\n| 2 | France | FR | 27 |\n",
        "utf-8"
      );

      const docsMdFile = path.join(tempDir, "apps/docs/src/content/docs/reference/supported-countries.mdx");
      fs.writeFileSync(
        docsMdFile,
        "---\ntitle: Supported Countries\n---\n\n| No | Country | Country Code | Length |\n| --- | --- | --- | --- |\n| 1 | Albania | AL | 28 |\n| 2 | France | FR | 27 |\n",
        "utf-8"
      );

      const specFile = path.join(tempDir, "packages/ngx-iban-validator/src/__tests__/iban.validator.spec.ts");
      fs.writeFileSync(
        specFile,
        "import { validateIBAN } from '../iban.validator';\n\ndescribe('validateIBAN', () => {\n  it('should pass', () => {});\n\n  it('validateIBAN for Albania AL35202111090000000001234567 should return null', () => {\n    expect(validateIBAN({ value: 'AL35202111090000000001234567' })).toBe(null);\n  });\n});\n",
        "utf-8"
      );

      const pkgJson = path.join(tempDir, "package.json");
      fs.writeFileSync(pkgJson, JSON.stringify({ description: "Currently 2 countries are supported." }, null, 2), "utf-8");

      const remoteMap = new Map([
        ["AL", { code: "AL", country: "Albania", length: 28, example: "AL35202111090000000001234567" }],
        ["ZZ", { code: "ZZ", country: "Zanziland", length: 20, example: "ZZ611904300234573201" }],
      ]);

      const localData = readLocalPackageData(tempDir);
      const comparison = compareData(remoteMap, localData);

      const result = applyUpdates(tempDir, remoteMap, localData, comparison);

      assert.equal(result.totalCountries, 3); // AL, FR (kept), ZZ (new)

      // Verify code-lengths.ts
      const updatedCodeLengths = fs.readFileSync(codeLengthsFile, "utf-8");
      assert.match(updatedCodeLengths, /AL: 28/);
      assert.match(updatedCodeLengths, /FR: 27/);
      assert.match(updatedCodeLengths, /ZZ: 20/);

      // Verify SUPPORTED_COUNTRIES.md
      const updatedMd = fs.readFileSync(supportedMdFile, "utf-8");
      assert.match(updatedMd, /Zanziland/);
      assert.match(updatedMd, /France/);

      // Verify spec file
      const updatedSpec = fs.readFileSync(specFile, "utf-8");
      assert.match(updatedSpec, /validateIBAN for Zanziland ZZ611904300234573201/);

      // Verify package.json description count
      const updatedPkg = JSON.parse(fs.readFileSync(pkgJson, "utf-8"));
      assert.equal(updatedPkg.description, "Currently 3 countries are supported.");

      // Cleanup
      fs.rmSync(tempDir, { recursive: true, force: true });
    });
  });
});
