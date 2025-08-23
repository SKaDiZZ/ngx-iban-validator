export interface IBANError {
    countryUnsupported: boolean;
    codeLengthInvalid: boolean;
    patternInvalid: boolean;
  }
  
  export interface IBANValidationResult {
    ibanInvalid: boolean;
    error: IBANError | null;
  }