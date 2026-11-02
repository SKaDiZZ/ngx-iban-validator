import { CODE_LENGTHS } from "./code-lengths.js";
import type { IBANError, IBANValidationResult } from "./types.js";

function mod97(digital: number | string) {
  digital = digital.toString();
  let checksum = parseInt(digital.slice(0, 2), 10);
  for (let offset = 2; offset < digital.length; offset += 7) {
    const fragment = checksum + digital.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

function invalid(error: Partial<IBANError>): IBANValidationResult {
  return {
    ibanInvalid: true,
    error: {
      countryUnsupported: false,
      codeLengthInvalid: false,
      patternInvalid: false,
      checksumInvalid: false,
      ...error,
    },
  };
}

/**
 * Validates a normalized IBAN and returns the first failed check, or null if the IBAN is valid.
 */
function check(value: string): IBANValidationResult | null {
  const iban = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const country = iban.slice(0, 2);

  if (!/^[A-Z]{2}$/.test(country)) {
    return invalid({ patternInvalid: true });
  }

  if (typeof CODE_LENGTHS[country] === "undefined") {
    return invalid({ countryUnsupported: true });
  }

  if (iban.length !== CODE_LENGTHS[country]) {
    return invalid({ codeLengthInvalid: true });
  }

  if (!/^\d{2}$/.test(iban.slice(2, 4))) {
    return invalid({ patternInvalid: true });
  }

  const digits = (iban.slice(4) + iban.slice(0, 4)).replace(/[A-Z]/g, (letter: string) =>
    (letter.charCodeAt(0) - 55).toString()
  );

  if (mod97(digits) !== 1) {
    // patternInvalid is kept for backwards compatibility with versions before checksumInvalid existed
    return invalid({ patternInvalid: true, checksumInvalid: true });
  }

  return null;
}

/**
 * Function to validate an International Bank Account Number (IBAN). It takes a control parameter, which can be either a string or an object with a value property that is a string.
 *
 * - Object input (e.g. an Angular form control): returns null if the IBAN is valid.
 * - String input: returns `{ ibanInvalid: false, error: null }` if the IBAN is valid.
 *
 * If the IBAN is invalid, it returns an object with `ibanInvalid: true` and an error object with the properties countryUnsupported, codeLengthInvalid, patternInvalid and checksumInvalid. Empty values return null.
 * @param {any} control string | Partial<{value:string}>
 * @returns {any} IBANValidationResult | null
 */
export function validateIBAN(control: string | Partial<{ value: string }>): IBANValidationResult | null {
  if (control) {
    if (typeof control === "string") {
      return check(control) ?? { ibanInvalid: false, error: null };
    }
    if ("value" in control && control.value) {
      return check(control.value);
    }
  }
  return null;
}

/**
 * Returns true if the given string is a valid IBAN. Spaces, dashes and lowercase letters are allowed.
 * @param {string} value IBAN to validate
 * @returns {boolean}
 */
export function isValidIBAN(value: string): boolean {
  return typeof value === "string" && value !== "" && check(value) === null;
}
