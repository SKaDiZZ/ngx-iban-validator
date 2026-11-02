import { isValidIBAN, validateIBAN } from "../iban.validator";
import type { IBANError } from "../types";

const VALID = "AT611904300234573201";

function error(overrides: Partial<IBANError>): IBANError {
  return {
    countryUnsupported: false,
    codeLengthInvalid: false,
    patternInvalid: false,
    checksumInvalid: false,
    ...overrides,
  };
}

describe("validateIBAN input handling", () => {
  it.each([
    ["lowercase", "at611904300234573201"],
    ["spaces", "AT61 1904 3002 3457 3201"],
    ["dashes", "AT61-1904-3002-3457-3201"],
    ["surrounding whitespace", "  AT611904300234573201  "],
  ])("accepts %s", (_, value) => {
    expect(validateIBAN({ value })).toBe(null);
    expect(validateIBAN(value)).toEqual({ ibanInvalid: false, error: null });
  });

  it.each([
    ["undefined control", undefined],
    ["null control", null],
    ["empty string", ""],
    ["empty control value", { value: "" }],
    ["control without value", {}],
  ])("returns null for %s", (_, control) => {
    expect(validateIBAN(control as any)).toBe(null);
  });

  it("returns the same error for string and control input", () => {
    const value = "AT621904300234573201";
    expect(validateIBAN(value)).toEqual(validateIBAN({ value }));
  });
});

describe("validateIBAN error reporting", () => {
  it("reports patternInvalid when the value has no country code", () => {
    expect(validateIBAN({ value: "1234567890" })?.error).toEqual(error({ patternInvalid: true }));
  });

  it("reports patternInvalid for whitespace-only input", () => {
    expect(validateIBAN({ value: "   " })?.error).toEqual(error({ patternInvalid: true }));
  });

  it("reports countryUnsupported even when the rest of the value is malformed", () => {
    expect(validateIBAN({ value: "ZZXX" })?.error).toEqual(error({ countryUnsupported: true }));
  });

  it("reports codeLengthInvalid for a supported country with the wrong length", () => {
    expect(validateIBAN({ value: "AT61190430023457320" })?.error).toEqual(error({ codeLengthInvalid: true }));
  });

  it("reports patternInvalid when the check digits are not numeric", () => {
    expect(validateIBAN({ value: "ATXX1904300234573201" })?.error).toEqual(error({ patternInvalid: true }));
  });

  it("reports checksumInvalid (and patternInvalid for compatibility) when mod-97 fails", () => {
    expect(validateIBAN({ value: "AT621904300234573201" })?.error).toEqual(
      error({ patternInvalid: true, checksumInvalid: true })
    );
  });
});

describe("isValidIBAN", () => {
  it("returns true for a valid IBAN", () => {
    expect(isValidIBAN(VALID)).toBe(true);
    expect(isValidIBAN("at61 1904 3002 3457 3201")).toBe(true);
  });

  it.each([
    ["empty string", ""],
    ["whitespace", "   "],
    ["bad checksum", "AT621904300234573201"],
    ["wrong length", "AT61190430023457320"],
    ["unsupported country", "ZZ611904300234573201"],
  ])("returns false for %s", (_, value) => {
    expect(isValidIBAN(value)).toBe(false);
  });

  it("returns false for non-string input", () => {
    expect(isValidIBAN(undefined as any)).toBe(false);
    expect(isValidIBAN(null as any)).toBe(false);
    expect(isValidIBAN(123 as any)).toBe(false);
  });
});
