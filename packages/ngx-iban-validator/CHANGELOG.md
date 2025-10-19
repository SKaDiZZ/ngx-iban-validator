# Changelog

All notable changes to the **NGX IBAN Validator** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2024-06-08

- Switch to pnpm as default package manager, setup monorepo structure, added demo apps and docs to repo
- Updated typescript and other dev dependencies
- Refractor validate function

## [1.2.2] - 2024-06-08

### Added

- **Yemen** YE

### Updated

- **Validate function**: don't return countryUnsupported error if input is for example 'YE' country is supported but length is invalid so instead codeLengthInvalid error will be returned
- **Tests**
- **Docs**

## [1.2.1] - 2024-11-07

### Updated

- **Burundi**: (BI) length 16 -> 27
- **Nicaragua**: (NI) length 32 -> 28

## [1.2.0] - 2024-20-03

### Updated

- **Docs**

## [1.1.9] - 2024-10-03

### Added

- **Sultanate of Oman** OM

## [1.1.8] - 2023-19-09

### Added

- **Falkland Islands** FK

## [1.1.7] - 2023-29-07

### Added

- **Djibouti** DJ
- **Somalia** SO

## [1.1.6] - 2023-30-06

### Updated

- **Error** structure
- **Value** can be passed directly as a string or part of the object.
  - If value is passed as a part of object same logic as for form validation is applied:
    - If IBAN is valid as result of validation **null** is returned.
    - If IBAN is invalid and some of the checks fail IBANValidationResult object is returned containing more info about error.
  - If value is passed as a string:
    - For valid and invalid IBAN IBANValidationResult object is returned.

### Fixed

- Return null for valid form field to fix issue with disabling | enabling buttons
  - Thnx to @pramodEE for reporting the issue

## [1.1.5] - 2023-23-06

### Added

- Additional pattern validation
- More tests to improve test coverage
- Countries: Algeria, Angola, Benin, Burkina Faso, Burundi, Cameroon, Cape Verde, Central African Republic, Chad, Comoros, Congo, Equatorial Guinea, Gabon, Guinea-Bissau, Honduras, Iran, Ivory Coast, Madagascar, Mali, Mongolia, Morocco, Mozambique, Nicaragua, Niger, Russia, Senegal, Togo

## [1.1.4] - 2023-04-10

### Fixed

- Avoid Angular warnings for old CommonJS module usage (see https://angular.io/guide/build#configuring-commonjs-dependencies)

### Changed

- Replaced mocha and chai with JEST for tests

## [1.1.3] - 2022-04-10

### Added

- Countries: Vatican, Libya, Sao Tome and Principe, Sudan
- Tests
- Mocha and Chai for testing

### Updated

- **Length**: for LC Saint Lucia from 30 to 32

## [1.1.2] - 2022-04-10

### Updated

- **Length**: for CR to 22 - @freddy36
