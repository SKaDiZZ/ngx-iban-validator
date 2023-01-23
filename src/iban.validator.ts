export interface IBANError {
  countryUnsupported: boolean;
  codeLengthInvalid: boolean;
  patternInvalid: boolean;
}

export interface IBANValidationResult {
  ibanInvalid: boolean;
  error: IBANError;
}

export function validateIBAN(control: any): IBANValidationResult {
  const codeLengths = {
    AD: 24,
    AE: 23,
    AL: 28,
    AO: 25,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BF: 28,
    BG: 22,
    BH: 22,
    BI: 16,
    BJ: 28,
    BR: 29,
    BY: 28,
    CF: 27,
    CG: 27,
    CH: 21,
    CI: 28,
    CM: 27,
    CR: 22,
    CV: 25,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    DZ: 26,
    EE: 20,
    EG: 29,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GA: 27,
    GB: 22,
    GE: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GQ: 27,
    GT: 28,
    GW: 25,
    HN: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IR: 26,
    IQ: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KM: 27,
    KW: 30,
    KZ: 20,
    LB: 28,
    LC: 32,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    LY: 25,
    MA: 28,
    MC: 27,
    MD: 24,
    ME: 22,
    MG: 27,
    MK: 19,
    ML: 28,
    MN: 20,
    MR: 27,
    MT: 31,
    MU: 30,
    MZ: 25,
    NE: 28,
    NI: 32,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RU: 33,
    RS: 22,
    SA: 24,
    SC: 31,
    SD: 18,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    SN: 28,
    ST: 25,
    SV: 28,
    TD: 27,
    TG: 28,
    TL: 23,
    TN: 24,
    TR: 26,
    UA: 29,
    VA: 22,
    VG: 24,
    XK: 20,
  };

  if (control.value) {
    const iban = control.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);

    let digits: number;

    if (!code || typeof codeLengths[code[1]] === "undefined") {
      return {
        ibanInvalid: true,
        error: {
          countryUnsupported: true,
          codeLengthInvalid: false,
          patternInvalid: false,
        },
      };
    }

    if (iban.length !== codeLengths[code[1]]) {
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

    digits = (code[3] + code[1] + code[2]).replace(
      /[A-Z]/g,
      (letter: string) => {
        return letter.charCodeAt(0) - 55;
      }
    );

    return mod97(digits) === 1
      ? {
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
}

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
