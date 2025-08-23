import { codeLengths } from "./code-lengths";
import { IBANValidationResult } from "./types";

function mod97(digital: number | string) {
  digital = digital.toString();
  let checksum: number | string = digital.slice(0, 2);
  let fragment = "";
  for (let offset = 2; offset < digital.length; offset += 7) {
    fragment = checksum + digital.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

function validate(
  value: string,
  control: boolean
): IBANValidationResult | null {
  const iban = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);

  if (code && code[1] && typeof codeLengths[code[1]] === "undefined") {
    return {
      ibanInvalid: true,
      error: {
        countryUnsupported: true,
        codeLengthInvalid: false,
        patternInvalid: false,
      },
    };
  }

  if (!code || (iban && iban.length !== codeLengths[code[1]])) {
    return {
      ibanInvalid: true,
      error: {
        countryUnsupported: false,
        codeLengthInvalid: true,
        patternInvalid: false,
      },
    };
  }

  if (!/^[A-Z]{2}\d{2}[A-Z\d]{1,30}$/.test(iban)) {
    return {
      ibanInvalid: true,
      error: {
        countryUnsupported: false,
        codeLengthInvalid: false,
        patternInvalid: true,
      },
    };
  }

  let digits: string = (code[3] + code[1] + code[2]).replace(
    /[A-Z]/g,
    (letter: string) => (letter.charCodeAt(0) - 55).toString()
  );

  return mod97(digits) === 1
    ? control
      ? null
      : {
          ibanInvalid: false,
          error: null,
        }
    : {
        ibanInvalid: true,
        error: {
          countryUnsupported: false,
          codeLengthInvalid: false,
          patternInvalid: true,
        },
      };
}

/**
 * Function to validate an International Bank Account Number (IBAN). It takes a control parameter, which can be either a string or an object with a value property that is a string. The function returns an object with a ibanInvalid property that is true if the IBAN is invalid, and an error object with three properties: countryUnsupported, codeLengthInvalid, and patternInvalid.
 * @param {any} control string | Partial<{value:string}>
 * @returns {any} IBANValidationResult | null
 */
export function validateIBAN(
  control: string | Partial<{ value: string }>
): IBANValidationResult | null {
  if (control) {
    if (typeof control === "string") {
      return validate(control, false);
    }
    if (control.hasOwnProperty("value") && control.value) {
      return validate(control.value, true);
    }
  }
  return null;
}
