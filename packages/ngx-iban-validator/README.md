# IBAN Validator

IBAN Validator for your web application forms ([Angular](#angular), [React](#react), Vue, ...), comes without any dependencies and can be used as a standalone function in any JS project. It can perform format, digit and length IBAN validations. Currently [112 countries](#supported-countries) are supported.

## Content

- [Install](#install)
- [Use as a standalone function](#use-as-a-standalone-function)
- [Error Response](#error-response)
- [Use as a form validator](#use-as-a-form-validator)
  - [Angular example](#angular)
  - [React example](#react)
- [Demo Applications](#demo)
- [Supported countries](#supported-countries)
- [Development](#development)
  - [Install dependencies](#install-dependencies)
  - [Test](#test)
  - [Build](#build)
- [Changelog](#changelog)
- [Read more](#read-more)

## Install

```bash
npm install ngx-iban-validator --save
```

## Use as a standalone function

You can use validateIBAN function independently from any forms.

Value can be passed as part of object in this case validation flow will be the same as for form validation:

- If IBAN is valid as result of validation **null** is returned.

- If IBAN is invalid and some of the checks fail IBANValidationResult object is returned containing more info about error.

```typescript
const ibanIsInvalid =
  validateIBAN({
    value: 'AL35202111090000000001234567',
  }) !== null;
```

Value can be passed as a string:

- For valid and invalid IBAN IBANValidationResult object is returned

```bash
const ibanIsInvalid = validateIBAN("AL35202111090000000001234567").ibanInvalid;
```

### NodeJS

```javascript
const ibanValidator = require('ngx-iban-validator');
const ibanIsInvalid = ibanValidator.validateIBAN(
  'BA393385804800211234'
).ibanInvalid;
```

## Error Response

- If IBAN is valid as result of validation **null** is returned.

- If IBAN is invalid and some of the checks fail IBANValidationResult object is returned containing more info about error.

```typescript
export interface IBANValidationResult {
  ibanInvalid: boolean;
  error: IBANError;
}

export interface IBANError {
  countryUnsupported: boolean;
  codeLengthInvalid: boolean;
  patternInvalid: boolean;
}
```

Error object contains more details about validation error. You can display errors easily as with any other validator.

## Use as a form validator

### Angular

Import validateIBAN function from ngx-iban-validator package into your component file. Add validateIBAN to your form validators array.

```ts
import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { validateIBAN } from 'ngx-iban-validator';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  template: `
    <div class="page">
      <form [formGroup]="ibanForm" (ngSubmit)="submit(ibanForm)">
        <h2>NGX IBAN Validator</h2>
        <div>
          <input type="text" formControlName="iban" placeholder="Enter IBAN" />
          <button [disabled]="ibanForm.invalid">Submit</button>
        </div>
        <div class="validation-errors">
          <small
            *ngIf="
                ibanForm.get('iban')?.errors && ibanForm.get('iban')?.errors?.['ibanInvalid']
              "
          >
            <span
              *ngIf="ibanForm.get('iban')?.errors?.['error']['countryUnsupported']"
            >
              Country not supported
            </span>
            <span
              *ngIf="ibanForm.get('iban')?.errors?.['error']['codeLengthInvalid']"
            >
              IBAN Code length is invalid
            </span>
            <span
              *ngIf="ibanForm.get('iban')?.errors?.['error']['patternInvalid']"
            >
              IBAN Code pattern is invalid
            </span>
          </small>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .page {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      h2 {
        text-align: center;
      }
      form {
        padding: 20px;
      }
      input {
        padding: 10px;
      }
      button {
        padding: 10px;
      }
      .validation-errors {
        color: red;
      }
    `,
  ],
})
export class App {
  formBuilder = inject(FormBuilder);
  ibanForm = this.formBuilder.group({
    iban: [null, [Validators.required, validateIBAN]],
  });
  submit(form: FormGroup) {
    const { valid, value } = form;
    const { iban } = value;
    if (valid) {
      alert(`IBAN: ${iban}, is valid!`);
    }
  }
}
```

### React

```tsx
import { useState } from 'react';

import {
  type IBANError,
  type IBANValidationResult,
  validateIBAN,
} from 'ngx-iban-validator';

import './App.css';

function App() {
  const [error, setError] = useState<IBANError | null>(null);

  const validate = (iban: string): boolean => {
    const validation = validateIBAN({
      value: iban,
    });
    if (validation) {
      const { ibanInvalid, error }: IBANValidationResult = validation;
      if (ibanInvalid) {
        setError(error);
        return false;
      } else {
        setError(null);
        return true;
      }
    } else {
      setError(null);
      return true;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const iban = formData.get('iban') as string;
    const validation = validate(iban);
    if (validation) {
      alert(`IBAN: ${iban}, is valid!`);
    } else {
      alert(`IBAN: ${iban}, is invalid!`);
    }
  };

  const handleIbanChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    validate(value);
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <h2>NGX IBAN Validator</h2>
        <div>
          <input
            type="text"
            name="iban"
            placeholder="Enter IBAN"
            onChange={handleIbanChanged}
          />
          <button>Submit</button>
        </div>
        <div className="validation-errors">
          <small hidden={!error}>
            <span hidden={!error?.countryUnsupported}>
              Country not supported
            </span>
            <span hidden={!error?.codeLengthInvalid}>
              IBAN Code length is invalid
            </span>
            <span hidden={!error?.patternInvalid}>
              IBAN Code pattern is invalid
            </span>
          </small>
        </div>
      </form>
    </div>
  );
}

export default App;
```

## Demo

Check demo applications for usage examples:

- [Angular - Demo Application](https://stackblitz.com/edit/stackblitz-starters-d6zn46?file=src%2Fmain.ts)
- [React - Demo Application](https://stackblitz.com/edit/vitejs-vite-mhe5gj?file=src%2FApp.tsx)

###

# Supported countries

####

<details>
<summary>
 Click here to expand list of supported countries
</summary>

| No  | Country                  | Country Code | Length |
| --- | ------------------------ | ------------ | ------ |
| 1   | Albania                  | AL           | 28     |
| 2   | Algeria                  | DZ           | 26     |
| 3   | Andorra                  | AD           | 24     |
| 4   | Angola                   | AO           | 25     |
| 5   | Austria                  | AT           | 20     |
| 6   | Azerbaijan               | AZ           | 28     |
| 7   | Bahrain                  | BH           | 22     |
| 8   | Belarus                  | BY           | 28     |
| 9   | Belgium                  | BE           | 16     |
| 10  | Benin                    | BJ           | 28     |
| 11  | Bosnia and Herzegovina   | BA           | 20     |
| 12  | Brazil                   | BR           | 29     |
| 13  | Bulgaria                 | BG           | 22     |
| 14  | Burundi                  | BI           | 27     |
| 15  | Burkina Faso             | BF           | 28     |
| 16  | Cameroon                 | CM           | 27     |
| 17  | Cape Verde               | CV           | 25     |
| 18  | Central African Republic | CF           | 27     |
| 19  | Chad                     | TD           | 27     |
| 20  | Comoros                  | KM           | 27     |
| 21  | Congo                    | CG           | 27     |
| 22  | Costa Rica               | CR           | 22     |
| 23  | Croatia                  | HR           | 21     |
| 24  | Cyprus                   | CY           | 28     |
| 25  | Czech Republic           | CZ           | 24     |
| 26  | Denmark                  | DK           | 18     |
| 27  | Djibouti                 | DJ           | 27     |
| 28  | Dominican Republic       | DO           | 28     |
| 29  | Egypt                    | EG           | 29     |
| 30  | El Salvador              | SV           | 28     |
| 32  | Equatorial Guinea        | GQ           | 27     |
| 33  | Estonia                  | EE           | 20     |
| 34  | Falkland Islands         | FK           | 18     |
| 35  | Faroe Islands            | FO           | 18     |
| 36  | Finland                  | FI           | 18     |
| 37  | France                   | FR           | 27     |
| 38  | Gabon                    | GA           | 27     |
| 39  | Georgia                  | GE           | 22     |
| 40  | Germany                  | DE           | 22     |
| 41  | Gibraltar                | GI           | 23     |
| 42  | Greece                   | GR           | 27     |
| 43  | Greenland                | GL           | 18     |
| 44  | Guatemala                | GT           | 28     |
| 45  | Guinea-Bissau            | GW           | 25     |
| 46  | Vatican                  | VA           | 22     |
| 47  | Honduras                 | HN           | 28     |
| 48  | Hungary                  | HU           | 28     |
| 49  | Iceland                  | IS           | 26     |
| 50  | Iran                     | IR           | 26     |
| 51  | Iraq                     | IQ           | 23     |
| 52  | Ireland                  | IE           | 22     |
| 53  | Israel                   | IL           | 23     |
| 54  | Italy                    | IT           | 27     |
| 55  | Ivory Coast              | CI           | 28     |
| 56  | Jordan                   | JO           | 30     |
| 57  | Kazakhstan               | KZ           | 20     |
| 58  | Kosovo                   | XK           | 20     |
| 59  | Kuwait                   | KW           | 30     |
| 60  | Latvia                   | LV           | 21     |
| 61  | Lebanon                  | LB           | 28     |
| 62  | Libya                    | LY           | 25     |
| 63  | Liechtenstein            | LI           | 21     |
| 64  | Lithuania                | LT           | 20     |
| 65  | Luxembourg               | LU           | 20     |
| 66  | Madagascar               | MG           | 27     |
| 67  | Mali                     | ML           | 28     |
| 68  | Malta                    | MT           | 31     |
| 69  | Mauritania               | MR           | 27     |
| 70  | Mauritius                | MU           | 30     |
| 71  | Moldova                  | MD           | 24     |
| 72  | Monaco                   | MC           | 27     |
| 73  | Mongolia                 | MN           | 20     |
| 74  | Montenegro               | ME           | 22     |
| 75  | Morocco                  | MA           | 28     |
| 76  | Mozambique               | MZ           | 25     |
| 77  | Netherlands              | NL           | 18     |
| 78  | Nicaragua                | NI           | 28     |
| 79  | Niger                    | NE           | 28     |
| 80  | North Macedonia          | MK           | 19     |
| 81  | Norway                   | NO           | 15     |
| 82  | Pakistan                 | PK           | 24     |
| 83  | Palestine                | PS           | 29     |
| 84  | Poland                   | PL           | 28     |
| 85  | Portugal                 | PT           | 25     |
| 86  | Qatar                    | QA           | 29     |
| 87  | Romania                  | RO           | 24     |
| 88  | Russia                   | RU           | 33     |
| 89  | Saint Lucia              | LC           | 32     |
| 90  | San Marino               | SM           | 27     |
| 91  | Sao Tome and Principe    | ST           | 25     |
| 92  | Saudi Arabia             | SA           | 24     |
| 93  | Senegal                  | SN           | 28     |
| 94  | Serbia                   | RS           | 22     |
| 95  | Seychelles               | SC           | 31     |
| 96  | Slovak Republic          | SK           | 24     |
| 97  | Slovenia                 | SI           | 19     |
| 98  | Somalia                  | SO           | 23     |
| 99  | Spain                    | ES           | 24     |
| 100 | Sudan                    | SD           | 18     |
| 101 | Sultanate of Oman        | OM           | 23     |
| 102 | Sweden                   | SE           | 24     |
| 103 | Switzerland              | CH           | 21     |
| 104 | Timor-Leste              | TL           | 23     |
| 105 | Togo                     | TG           | 28     |
| 106 | Tunisia                  | TN           | 24     |
| 107 | Turkey                   | TR           | 26     |
| 108 | Ukraine                  | UA           | 29     |
| 109 | United Arab Emirates     | AE           | 23     |
| 110 | United Kingdom           | GB           | 22     |
| 111 | Virgin Islands, British  | VG           | 24     |
| 112 | Yemen                    | YE           | 30     |

</details>

###

# Development

## Install dependencies

```bash
pnpm i
```

## Test

```bash
pnpm test
```

## Build

```bash
pnpm build
```

# Changelog

## v 1.2.2

- Added Support for Yemen
- Updated validate function to not return countryUnsupported error if input is for example 'YE' country is supported but length is invalid so instead codeLengthInvalid error will be returned
- Updated tests and docs

## v 1.2.1

- Updated Burundi (BI) length 16 -> 27
- Updated Nicaragua (NI) length 32 -> 28

## v 1.2.0

- Updated documentation

## v 1.1.9

- Added support for Sultanate of Oman

## v 1.1.8

- Added support for Falkland Islands

## v 1.1.7

- Added support for Djibouti and Somalia

## v 1.1.6

- Updated error display logic
- Value can be passed directly as a string or part of the object.
  - If value is passed as a part of object same logic as for form validation is applied:
    - If IBAN is valid as result of validation **null** is returned.
    - If IBAN is invalid and some of the checks fail IBANValidationResult object is returned containing more info about error.
  - If value is passed as a string:
    - For valid and invalid IBAN IBANValidationResult object is returned.
- Return null for valid form field to fix issue with disabling | enabling buttons
  - Thnx to @pramodEE for reporting the issue

## v 1.1.5

Added additional pattern validation
Added more tests to improve test coverage
Added support for new countries: Algeria, Angola, Benin, Burkina Faso, Burundi, Cameroon, Cape Verde, Central African Republic, Chad, Comoros, Congo, Equatorial Guinea, Gabon, Guinea-Bissau, Honduras, Iran, Ivory Coast, Madagascar, Mali, Mongolia, Morocco, Mozambique, Nicaragua, Niger, Russia, Senegal, Togo

## v 1.1.4

Avoid Angular warnings for old CommonJS module usage (see https://angular.io/guide/build#configuring-commonjs-dependencies)

Replaced mocha and chai with JEST for tests

## v 1.1.3

Added support for new countries: Vatican, Libya, Sao Tome and Principe, Sudan
Updated length for LC Saint Lucia from 30 to 32

Added Tests
Added Mocha and Chai for testing

## v 1.1.2

Updated length for CR to 22 - @freddy36

## Read more

[IBAN Examples](https://www.iban.com/structure)
