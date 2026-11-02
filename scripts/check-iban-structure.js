#!/usr/bin/env node

/**
 * IBAN Structure Checker & Synchronizer
 *
 * Checks IBAN definitions from https://www.iban.com/structure against the
 * ngx-iban-validator package, detects new countries or changed IBAN lengths,
 * and updates package source files, documentation, and tests.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const DEFAULT_URL = "https://www.iban.com/structure";

// ANSI color helpers
const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const colors = {
  reset: useColor ? "\x1b[0m" : "",
  bold: useColor ? "\x1b[1m" : "",
  dim: useColor ? "\x1b[2m" : "",
  red: useColor ? "\x1b[31m" : "",
  green: useColor ? "\x1b[32m" : "",
  yellow: useColor ? "\x1b[33m" : "",
  blue: useColor ? "\x1b[34m" : "",
  magenta: useColor ? "\x1b[35m" : "",
  cyan: useColor ? "\x1b[36m" : "",
  white: useColor ? "\x1b[37m" : "",
};

// Mod 97 IBAN checksum verification
export function mod97(digital) {
  const str = digital.toString();
  let checksum = parseInt(str.slice(0, 2), 10);
  for (let offset = 2; offset < str.length; offset += 7) {
    const fragment = checksum + str.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

export function validateIbanMod97(iban) {
  if (!iban) return false;
  const cleanIban = iban.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const code = cleanIban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
  if (!code) return false;
  const digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, (letter) =>
    (letter.charCodeAt(0) - 55).toString()
  );
  return mod97(digits) === 1;
}

/**
 * Fetch HTML content from remote URL or read from local file
 */
export async function fetchHtml(urlOrPath, isLocalFile = false) {
  if (isLocalFile) {
    const filePath = path.resolve(process.cwd(), urlOrPath);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return fs.readFileSync(filePath, "utf-8");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(urlOrPath, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ngx-iban-validator-sync/1.0; +https://github.com/SKaDiZZ/ngx-iban-validator)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Parse IBAN structure HTML from iban.com
 */
export function parseIbanStructureHtml(html) {
  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/i);
  if (!tbodyMatch) {
    throw new Error(
      "Could not find <tbody> in the HTML. The table structure may have changed."
    );
  }

  const rows = tbodyMatch[1].match(/<tr[\s\S]*?<\/tr>/gi) || [];
  const results = new Map();

  for (const row of rows) {
    const cells = (row.match(/<td[\s\S]*?<\/td>/gi) || []).map((cell) =>
      cell
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim()
    );

    if (cells.length >= 7) {
      const country = cells[0];
      const code = cells[1].toUpperCase();
      const sepa = cells[2];
      const length = parseInt(cells[3], 10);
      const accountCheck = cells[4];
      const branch = cells[5];
      const example = cells[6].replace(/\s+/g, "");

      if (/^[A-Z]{2}$/.test(code) && !Number.isNaN(length) && length > 0) {
        results.set(code, {
          country,
          code,
          sepa,
          length,
          accountCheck,
          branch,
          example,
        });
      }
    }
  }

  return results;
}

/**
 * Read current data from project files
 */
export function readLocalPackageData(rootDir = ROOT_DIR) {
  const codeLengthsPath = path.join(
    rootDir,
    "packages/ngx-iban-validator/src/code-lengths.ts"
  );
  const supportedCountriesPath = path.join(rootDir, "SUPPORTED_COUNTRIES.md");
  const docsCountriesPath = path.join(
    rootDir,
    "apps/docs/src/content/docs/reference/supported-countries.mdx"
  );
  const specPath = path.join(
    rootDir,
    "packages/ngx-iban-validator/src/__tests__/iban.validator.spec.ts"
  );
  const rootPackageJsonPath = path.join(rootDir, "package.json");
  const pkgPackageJsonPath = path.join(
    rootDir,
    "packages/ngx-iban-validator/package.json"
  );
  const rootReadmePath = path.join(rootDir, "README.md");
  const pkgReadmePath = path.join(
    rootDir,
    "packages/ngx-iban-validator/README.md"
  );
  const docsIndexPath = path.join(
    rootDir,
    "apps/docs/src/content/docs/index.mdx"
  );

  // 1. CODE_LENGTHS
  const codeLengths = new Map();
  if (fs.existsSync(codeLengthsPath)) {
    const codeLengthsContent = fs.readFileSync(codeLengthsPath, "utf-8");
    const matches = codeLengthsContent.matchAll(/([A-Z]{2}):\s*(\d+)/g);
    for (const match of matches) {
      codeLengths.set(match[1], parseInt(match[2], 10));
    }
  }

  // 2. SUPPORTED_COUNTRIES.md
  const supportedCountries = new Map();
  if (fs.existsSync(supportedCountriesPath)) {
    const content = fs.readFileSync(supportedCountriesPath, "utf-8");
    const rows = content.matchAll(
      /\|\s*(\d+)\s*\|\s*([^|]+)\|\s*([A-Z]{2})\s*\|\s*(\d+)\s*\|/g
    );
    for (const row of rows) {
      supportedCountries.set(row[3], {
        num: parseInt(row[1], 10),
        country: row[2].trim(),
        code: row[3].trim(),
        length: parseInt(row[4], 10),
      });
    }
  }

  // 3. apps/docs supported-countries.mdx
  const docsCountries = new Map();
  if (fs.existsSync(docsCountriesPath)) {
    const content = fs.readFileSync(docsCountriesPath, "utf-8");
    const rows = content.matchAll(
      /\|\s*(\d+)\s*\|\s*([^|]+)\|\s*([A-Z]{2})\s*\|\s*(\d+)\s*\|/g
    );
    for (const row of rows) {
      docsCountries.set(row[3], {
        num: parseInt(row[1], 10),
        country: row[2].trim(),
        code: row[3].trim(),
        length: parseInt(row[4], 10),
      });
    }
  }

  // 4. Test cases in iban.validator.spec.ts
  const testCases = new Map();
  let baseTestsHeader = "";
  if (fs.existsSync(specPath)) {
    const content = fs.readFileSync(specPath, "utf-8");
    const firstCountryTestIdx = content.indexOf('it("validateIBAN for');
    if (firstCountryTestIdx !== -1) {
      baseTestsHeader = content.substring(0, firstCountryTestIdx);
    } else {
      baseTestsHeader = content;
    }

    const testMatches = content.matchAll(
      /it\("validateIBAN for ([^\t\n"]+?)\s+([A-Z0-9]+)\s+should return null",\s*\(\)\s*=>\s*\{\s*expect\(validateIBAN\({\s*value:\s*"([^"]+)"\s*}\)\)\.toBe\(null\);/g
    );
    for (const m of testMatches) {
      const value = m[3];
      const code = value.substring(0, 2);
      testCases.set(code, {
        titleCountry: m[1].trim(),
        titleIban: m[2].trim(),
        value,
      });
    }
  }

  // Country count in package.json and descriptions
  let descriptionCount = null;
  if (fs.existsSync(rootPackageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(rootPackageJsonPath, "utf-8"));
    const match = pkg.description?.match(/Currently (\d+) countries/);
    if (match) descriptionCount = parseInt(match[1], 10);
  }

  return {
    paths: {
      codeLengthsPath,
      supportedCountriesPath,
      docsCountriesPath,
      specPath,
      rootPackageJsonPath,
      pkgPackageJsonPath,
      rootReadmePath,
      pkgReadmePath,
      docsIndexPath,
    },
    codeLengths,
    supportedCountries,
    docsCountries,
    testCases,
    baseTestsHeader,
    descriptionCount,
  };
}

/**
 * Compare remote iban.com data with local package data
 */
export function compareData(remoteMap, localData) {
  const { codeLengths, supportedCountries, docsCountries, testCases } =
    localData;

  const newCountries = [];
  const changedLengths = [];
  const localOnly = [];
  const internalDiscrepancies = [];

  // Check remote against local
  for (const [code, remote] of remoteMap.entries()) {
    if (!codeLengths.has(code)) {
      newCountries.push(remote);
    } else {
      const localLen = codeLengths.get(code);
      if (localLen !== remote.length) {
        changedLengths.push({
          code,
          country: remote.country,
          localLength: localLen,
          remoteLength: remote.length,
          example: remote.example,
        });
      }
    }
  }

  // Check local countries that are not in remote (must be preserved)
  for (const [code, len] of codeLengths.entries()) {
    if (!remoteMap.has(code)) {
      const countryInfo = supportedCountries.get(code);
      localOnly.push({
        code,
        length: len,
        country: countryInfo ? countryInfo.country : code,
      });
    }
  }

  // Sort lists for deterministic output
  newCountries.sort((a, b) => a.code.localeCompare(b.code));
  changedLengths.sort((a, b) => a.code.localeCompare(b.code));
  localOnly.sort((a, b) => a.code.localeCompare(b.code));

  // Check internal inconsistencies across local files
  for (const [code, len] of codeLengths.entries()) {
    const mdInfo = supportedCountries.get(code);
    if (!mdInfo) {
      internalDiscrepancies.push(
        `SUPPORTED_COUNTRIES.md missing entry for [${code}]`
      );
    } else if (mdInfo.length !== len) {
      internalDiscrepancies.push(
        `SUPPORTED_COUNTRIES.md length mismatch for [${code}]: markdown has ${mdInfo.length}, code-lengths.ts has ${len}`
      );
    }

    if (docsCountries.size > 0) {
      const docsInfo = docsCountries.get(code);
      if (!docsInfo) {
        internalDiscrepancies.push(
          `apps/docs supported-countries.mdx missing entry for [${code}]`
        );
      } else if (docsInfo.length !== len) {
        internalDiscrepancies.push(
          `apps/docs supported-countries.mdx length mismatch for [${code}]: mdx has ${docsInfo.length}, code-lengths.ts has ${len}`
        );
      }
    }

    const testInfo = testCases.get(code);
    if (!testInfo) {
      internalDiscrepancies.push(
        `iban.validator.spec.ts missing unit test for [${code}]`
      );
    } else if (testInfo.value.length !== len) {
      internalDiscrepancies.push(
        `iban.validator.spec.ts example length mismatch for [${code}]: test value length ${testInfo.value.length} vs expected ${len}`
      );
    }
  }

  const totalLocalCountries = codeLengths.size;
  const totalRemoteCountries = remoteMap.size;
  const hasDifferences = newCountries.length > 0 || changedLengths.length > 0;
  const hasDiscrepancies = internalDiscrepancies.length > 0;

  return {
    remoteCount: totalRemoteCountries,
    localCount: totalLocalCountries,
    newCountries,
    changedLengths,
    localOnly,
    internalDiscrepancies,
    hasDifferences,
    hasDiscrepancies,
  };
}

/**
 * Format and print comparison report to console
 */
export function formatReport(comparisonResult, options = {}) {
  const {
    remoteCount,
    localCount,
    newCountries,
    changedLengths,
    localOnly,
    internalDiscrepancies,
    hasDifferences,
    hasDiscrepancies,
  } = comparisonResult;

  const lines = [];

  lines.push("");
  lines.push(
    `${colors.bold}${colors.cyan}═══════════════════════════════════════════════════════════════════════════${colors.reset}`
  );
  lines.push(
    `${colors.bold}${colors.cyan}                    IBAN Structure Comparison Report                      ${colors.reset}`
  );
  lines.push(
    `${colors.bold}${colors.cyan}═══════════════════════════════════════════════════════════════════════════${colors.reset}`
  );
  lines.push("");

  lines.push(`${colors.bold}Source:${colors.reset} ${options.source || DEFAULT_URL}`);
  lines.push(
    `${colors.bold}Status:${colors.reset} ${
      hasDifferences
        ? `${colors.yellow}Differences detected between remote and local${colors.reset}`
        : `${colors.green}All remote IBAN structures match local code-lengths${colors.reset}`
    }`
  );
  lines.push("");

  lines.push(`${colors.bold}Summary:${colors.reset}`);
  lines.push(`  • Remote countries (iban.com):    ${colors.bold}${remoteCount}${colors.reset}`);
  lines.push(`  • Local package countries:        ${colors.bold}${localCount}${colors.reset}`);
  lines.push(
    `  • New countries to add:           ${
      newCountries.length > 0
        ? `${colors.green}${colors.bold}${newCountries.length}${colors.reset}`
        : "0"
    }`
  );
  lines.push(
    `  • Changed IBAN lengths:           ${
      changedLengths.length > 0
        ? `${colors.red}${colors.bold}${changedLengths.length}${colors.reset}`
        : "0"
    }`
  );
  lines.push(
    `  • Local-only countries (kept):    ${colors.dim}${localOnly.length}${colors.reset}`
  );
  lines.push("");

  // New countries
  if (newCountries.length > 0) {
    lines.push(
      `${colors.bold}${colors.green}🆕 New Countries (${newCountries.length}):${colors.reset}`
    );
    lines.push(
      `  ${"Code".padEnd(6)}${"Country".padEnd(30)}${"Length".padEnd(8)}Example IBAN`
    );
    lines.push(`  ${"─".repeat(70)}`);
    for (const item of newCountries) {
      lines.push(
        `  ${colors.green}${item.code.padEnd(6)}${colors.reset}${item.country.padEnd(
          30
        )}${String(item.length).padEnd(8)}${item.example || "N/A"}`
      );
    }
    lines.push("");
  }

  // Changed lengths
  if (changedLengths.length > 0) {
    lines.push(
      `${colors.bold}${colors.red}⚠️  Changed IBAN Lengths (${changedLengths.length}):${colors.reset}`
    );
    lines.push(
      `  ${"Code".padEnd(6)}${"Country".padEnd(30)}${"Local".padEnd(10)}${"Remote".padEnd(10)}Example IBAN`
    );
    lines.push(`  ${"─".repeat(70)}`);
    for (const item of changedLengths) {
      lines.push(
        `  ${colors.red}${item.code.padEnd(6)}${colors.reset}${item.country.padEnd(
          30
        )}${String(item.localLength).padEnd(10)}${colors.bold}${String(
          item.remoteLength
        ).padEnd(10)}${colors.reset}${item.example || "N/A"}`
      );
    }
    lines.push("");
  }

  // Internal discrepancies
  if (hasDiscrepancies) {
    lines.push(
      `${colors.bold}${colors.yellow}🔍 Internal Package Discrepancies (${internalDiscrepancies.length}):${colors.reset}`
    );
    for (const item of internalDiscrepancies) {
      lines.push(`  ${colors.yellow}•${colors.reset} ${item}`);
    }
    lines.push("");
  }

  // Guidance
  if (hasDifferences || (hasDiscrepancies && options.fixInternal)) {
    lines.push(`${colors.bold}Action:${colors.reset}`);
    lines.push(
      `  Run ${colors.cyan}node scripts/check-iban-structure.js --update${colors.reset} (or ${colors.cyan}pnpm update:iban${colors.reset}) to automatically update all code, docs, and tests.`
    );
  } else if (!hasDifferences && !hasDiscrepancies) {
    lines.push(
      `${colors.green}✓ Everything is up to date and in perfect sync!${colors.reset}`
    );
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * Update all package files (code, markdown, docs, tests, and package.json)
 */
export function applyUpdates(
  rootDir,
  remoteMap,
  localData,
  comparisonResult
) {
  const { paths, supportedCountries, testCases, baseTestsHeader } = localData;

  // Build unified country map: code -> { country, code, length, example }
  const mergedMap = new Map();

  // 1. Start with existing local countries (preserving custom country names and examples)
  for (const [code, len] of localData.codeLengths.entries()) {
    const sc = supportedCountries.get(code);
    const tc = testCases.get(code);
    mergedMap.set(code, {
      code,
      country: sc?.country || code,
      length: len,
      example: tc?.value || "",
    });
  }

  // 2. Apply updates and additions from remote
  for (const [code, remote] of remoteMap.entries()) {
    if (mergedMap.has(code)) {
      const existing = mergedMap.get(code);
      existing.length = remote.length;
      if (remote.example && validateIbanMod97(remote.example)) {
        existing.example = remote.example;
      }
    } else {
      mergedMap.set(code, {
        code,
        country: remote.country,
        length: remote.length,
        example: remote.example || "",
      });
    }
  }

  // Sort countries alphabetically by Country Code for code-lengths.ts
  const sortedByCode = Array.from(mergedMap.values()).sort((a, b) =>
    a.code.localeCompare(b.code)
  );

  // Sort countries alphabetically by Country Name for documentation & tests
  const sortedByName = Array.from(mergedMap.values()).sort((a, b) =>
    a.country.localeCompare(b.country)
  );

  const totalCountries = sortedByCode.length;

  // A. Generate packages/ngx-iban-validator/src/code-lengths.ts
  const codeLengthsLines = [
    "export const CODE_LENGTHS: { [key: string]: number } = {",
  ];
  for (const item of sortedByCode) {
    codeLengthsLines.push(`  ${item.code}: ${item.length},`);
  }
  codeLengthsLines.push("};");
  codeLengthsLines.push("");
  fs.writeFileSync(paths.codeLengthsPath, codeLengthsLines.join("\n"), "utf-8");

  // B. Generate SUPPORTED_COUNTRIES.md
  const mdLines = [
    "###",
    "",
    "# Supported countries",
    "",
    "####",
    "",
    "| No  | Country                  | Country Code | Length |",
    "| --- | ------------------------ | ------------ | ------ |",
  ];
  sortedByName.forEach((item, index) => {
    const no = String(index + 1).padEnd(3);
    const country = item.country.padEnd(24);
    const code = item.code.padEnd(12);
    const length = String(item.length).padEnd(6);
    mdLines.push(`| ${no} | ${country} | ${code} | ${length} |`);
  });
  mdLines.push("");
  fs.writeFileSync(paths.supportedCountriesPath, mdLines.join("\n"), "utf-8");

  // C. Generate apps/docs/src/content/docs/reference/supported-countries.mdx
  if (fs.existsSync(paths.docsCountriesPath)) {
    const mdxLines = [
      "---",
      "title: Supported Countries",
      "description: List of countries supported by IBAN Validator",
      "---",
      "",
      "This is the list of countries supported by IBAN Validator:",
      "",
      "| No  | Country                  | Country Code | Length |",
      "| --- | ------------------------ | ------------ | ------ |",
    ];
    sortedByName.forEach((item, index) => {
      const no = String(index + 1).padEnd(3);
      const country = item.country.padEnd(24);
      const code = item.code.padEnd(12);
      const length = String(item.length).padEnd(6);
      mdxLines.push(`| ${no} | ${country} | ${code} | ${length} |`);
    });
    mdxLines.push("");
    fs.writeFileSync(paths.docsCountriesPath, mdxLines.join("\n"), "utf-8");
  }

  // D. Generate packages/ngx-iban-validator/src/__tests__/iban.validator.spec.ts
  if (fs.existsSync(paths.specPath)) {
    const specLines = [];
    const header = baseTestsHeader.trimEnd();
    specLines.push(header);
    specLines.push("");

    for (const item of sortedByName) {
      let example = item.example;
      if (!example || example.length !== item.length) {
        // If no valid example exists, fallback to previous test value or remote example
        const prevTest = testCases.get(item.code);
        if (prevTest?.value && prevTest.value.length === item.length) {
          example = prevTest.value;
        } else if (remoteMap.get(item.code)?.example) {
          example = remoteMap.get(item.code).example;
        }
      }

      specLines.push(
        `  it("validateIBAN for ${item.country} ${example} should return null", () => {`
      );
      specLines.push(
        `    expect(validateIBAN({ value: "${example}" })).toBe(null);`
      );
      specLines.push("  });");
      specLines.push("");
    }

    specLines.push("});");
    specLines.push("");
    fs.writeFileSync(paths.specPath, specLines.join("\n"), "utf-8");
  }

  // E. Update Country Counts in package.json & READMEs & docs
  const updateCountInFile = (filePath, pattern, replacement) => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replace(pattern, replacement);
      fs.writeFileSync(filePath, content, "utf-8");
    }
  };

  // package.json files
  updateCountInFile(
    paths.rootPackageJsonPath,
    /Currently \d+ countries are supported\./g,
    `Currently ${totalCountries} countries are supported.`
  );
  updateCountInFile(
    paths.pkgPackageJsonPath,
    /Currently \d+ countries are supported\./g,
    `Currently ${totalCountries} countries are supported.`
  );

  // README files
  updateCountInFile(
    paths.rootReadmePath,
    /Currently \[\d+ countries\]/g,
    `Currently [${totalCountries} countries]`
  );
  updateCountInFile(
    paths.pkgReadmePath,
    /Currently \[\d+ countries\]/g,
    `Currently [${totalCountries} countries]`
  );

  // Docs index
  updateCountInFile(
    paths.docsIndexPath,
    /Currently \d+ countries are supported\./g,
    `Currently ${totalCountries} countries are supported.`
  );

  return {
    totalCountries,
    updatedFiles: [
      paths.codeLengthsPath,
      paths.supportedCountriesPath,
      paths.docsCountriesPath,
      paths.specPath,
      paths.rootPackageJsonPath,
      paths.pkgPackageJsonPath,
      paths.rootReadmePath,
      paths.pkgReadmePath,
      paths.docsIndexPath,
    ].filter(fs.existsSync),
  };
}

/**
 * Format files using workspace biome formatter
 */
export function formatWorkspaceFiles(rootDir = ROOT_DIR) {
  try {
    execSync("pnpm --filter ngx-iban-validator run format", {
      cwd: rootDir,
      stdio: "pipe",
    });
  } catch (_e) {
    // Biome format is optional/best-effort
  }
}

/**
 * Run tests to verify all IBAN structures and specs pass
 */
export function runTests(rootDir = ROOT_DIR) {
  try {
    const output = execSync("pnpm test", {
      cwd: rootDir,
      stdio: "pipe",
      encoding: "utf-8",
    });
    return { success: true, output };
  } catch (error) {
    return { success: false, output: error.stdout || error.message };
  }
}

/**
 * Main CLI handler
 */
export async function main(args = process.argv.slice(2)) {
  const options = {
    update: false,
    check: true,
    ci: false,
    json: false,
    fixInternal: false,
    file: null,
    url: DEFAULT_URL,
    help: false,
  };

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--update" || arg === "-u") {
      options.update = true;
    } else if (arg === "--check") {
      options.check = true;
    } else if (arg === "--fix-internal") {
      options.fixInternal = true;
    } else if (arg === "--ci") {
      options.ci = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--file" || arg === "-f") {
      options.file = args[++i];
    } else if (arg === "--url") {
      options.url = args[++i];
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    }
  }

  if (options.help) {
    console.log(`
${colors.bold}IBAN Structure Checker & Synchronizer${colors.reset}

Usage:
  node scripts/check-iban-structure.js [options]
  pnpm check:iban
  pnpm update:iban

Options:
  --check                 Check and report differences without updating (default)
  --update, -u            Update package files, documentation, and tests
  --fix-internal          Fix internal package discrepancies even if remote has no changes
  --ci                    Exit with code 1 if differences or discrepancies exist
  --file <path>, -f       Load and parse HTML from a local file instead of network
  --url <url>             Custom URL to fetch IBAN structure (default: https://www.iban.com/structure)
  --json                  Output comparison report in JSON format
  --help, -h              Display this help message
`);
    return 0;
  }

  try {
    const source = options.file || options.url;
    if (!options.json) {
      console.log(
        `${colors.dim}Fetching IBAN structures from ${source}...${colors.reset}`
      );
    }

    const html = await fetchHtml(source, Boolean(options.file));
    const remoteMap = parseIbanStructureHtml(html);
    const localData = readLocalPackageData(ROOT_DIR);
    const comparison = compareData(remoteMap, localData);

    if (options.json) {
      console.log(
        JSON.stringify(
          {
            source,
            timestamp: new Date().toISOString(),
            ...comparison,
          },
          null,
          2
        )
      );
      if (options.ci && (comparison.hasDifferences || comparison.hasDiscrepancies)) {
        return 1;
      }
      return 0;
    }

    // Print human-readable report
    console.log(formatReport(comparison, { source, fixInternal: options.fixInternal }));

    // If update requested
    if (options.update || (options.fixInternal && comparison.hasDiscrepancies)) {
      console.log(
        `${colors.bold}${colors.cyan}Applying updates to package files...${colors.reset}`
      );
      const result = applyUpdates(ROOT_DIR, remoteMap, localData, comparison);

      console.log(
        `${colors.green}✓ Updated ${result.updatedFiles.length} files successfully.${colors.reset}`
      );
      console.log(
        `  Total supported countries in package: ${colors.bold}${result.totalCountries}${colors.reset}`
      );

      console.log(`${colors.dim}Formatting files with Biome...${colors.reset}`);
      formatWorkspaceFiles(ROOT_DIR);

      console.log(`${colors.dim}Running unit tests...${colors.reset}`);
      const testResult = runTests(ROOT_DIR);
      if (testResult.success) {
        console.log(
          `${colors.green}✓ All unit tests passed successfully!${colors.reset}\n`
        );
      } else {
        console.log(
          `${colors.red}✗ Unit tests failed after update:${colors.reset}\n`,
          testResult.output
        );
        return 1;
      }
    }

    if (options.ci && (comparison.hasDifferences || comparison.hasDiscrepancies)) {
      return 1;
    }

    return 0;
  } catch (error) {
    if (options.json) {
      console.error(JSON.stringify({ error: error.message }));
    } else {
      console.error(
        `\n${colors.red}${colors.bold}Error:${colors.reset} ${error.message}\n`
      );
    }
    return 1;
  }
}

// Run directly when called as script
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(__filename)
) {
  main().then((exitCode) => {
    if (exitCode !== 0) process.exit(exitCode);
  });
}
