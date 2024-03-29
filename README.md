# IBAN Validator

IBAN Validator for your web application forms ([Angular](#angular), [React](#react), Vue, ...), comes without any dependencies and can be used as a standalone function in any JS project. It can perform format, digit and length IBAN validations. Currently [108 countries](#supported-countries) are supported.

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
    value: "AL35202111090000000001234567",
  }) !== null;
```

Value can be passed as a string:

- For valid and invalid IBAN IBANValidationResult object is returned

```bash
const ibanIsInvalid = validateIBAN("AL35202111090000000001234567").ibanInvalid;
```

### NodeJS

```javascript
const ibanValidator = require("ngx-iban-validator");
const ibanIsInvalid = ibanValidator.validateIBAN(
  "BA393385804800211234"
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
import { Component, inject } from "@angular/core";
import { NgIf } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { validateIBAN } from "ngx-iban-validator";

@Component({
  selector: "my-app",
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
import { useState } from "react";
import {
  IBANError,
  IBANValidationResult,
  validateIBAN,
} from "ngx-iban-validator/dist/iban.validator";

import "./App.css";

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
    const iban = formData.get("iban") as string;
    const validation = validate(iban);
    if (validation) {
      alert("IBAN is valid");
    } else {
      alert("IBAN is not valid");
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

| Country                  | Country Code | Length |
| ------------------------ | ------------ | ------ |
| Albania                  | AL           | 28     |
| Algeria                  | DZ           | 26     |
| Andorra                  | AD           | 24     |
| Angola                   | AO           | 25     |
| Austria                  | AT           | 20     |
| Azerbaijan               | AZ           | 28     |
| Bahrain                  | BH           | 22     |
| Belarus                  | BY           | 28     |
| Belgium                  | BE           | 16     |
| Benin                    | BJ           | 28     |
| Bosnia and Herzegovina   | BA           | 20     |
| Brazil                   | BR           | 29     |
| Bulgaria                 | BG           | 22     |
| Burundi                  | BI           | 16     |
| Burkina Faso             | BF           | 28     |
| Cameroon                 | CM           | 27     |
| Cape Verde               | CV           | 25     |
| Central African Republic | CF           | 27     |
| Chad                     | TD           | 27     |
| Comoros                  | KM           | 27     |
| Congo                    | CG           | 27     |
| Costa Rica               | CR           | 22     |
| Croatia                  | HR           | 21     |
| Cyprus                   | CY           | 28     |
| Czech Republic           | CZ           | 24     |
| Denmark                  | DK           | 18     |
| Djibouti                 | DJ           | 27     |
| Dominican Republic       | DO           | 28     |
| Egypt                    | EG           | 29     |
| El Salvador              | SV           | 28     |
| Equatorial Guinea        | GQ           | 27     |
| Estonia                  | EE           | 20     |
| Falkland Islands         | FK           | 18     |
| Faroe Islands            | FO           | 18     |
| Finland                  | FI           | 18     |
| France                   | FR           | 27     |
| Gabon                    | GA           | 27     |
| Georgia                  | GE           | 22     |
| Germany                  | DE           | 22     |
| Gibraltar                | GI           | 23     |
| Greece                   | GR           | 27     |
| Greenland                | GL           | 18     |
| Guatemala                | GT           | 28     |
| Guinea-Bissau            | GW           | 25     |
| Vatican                  | VA           | 22     |
| Honduras                 | HN           | 28     |
| Hungary                  | HU           | 28     |
| Iceland                  | IS           | 26     |
| Iran                     | IR           | 26     |
| Iraq                     | IQ           | 23     |
| Ireland                  | IE           | 22     |
| Israel                   | IL           | 23     |
| Italy                    | IT           | 27     |
| Ivory Coast              | CI           | 28     |
| Jordan                   | JO           | 30     |
| Kazakhstan               | KZ           | 20     |
| Kosovo                   | XK           | 20     |
| Kuwait                   | KW           | 30     |
| Latvia                   | LV           | 21     |
| Lebanon                  | LB           | 28     |
| Libya                    | LY           | 25     |
| Liechtenstein            | LI           | 21     |
| Lithuania                | LT           | 20     |
| Luxembourg               | LU           | 20     |
| Madagascar               | MG           | 27     |
| Mali                     | ML           | 28     |
| Malta                    | MT           | 31     |
| Mauritania               | MR           | 27     |
| Mauritius                | MU           | 30     |
| Moldova                  | MD           | 24     |
| Monaco                   | MC           | 27     |
| Mongolia                 | MN           | 20     |
| Montenegro               | ME           | 22     |
| Morocco                  | MA           | 28     |
| Mozambique               | MZ           | 25     |
| Netherlands              | NL           | 18     |
| Nicaragua                | NI           | 32     |
| Niger                    | NE           | 28     |
| North Macedonia          | MK           | 19     |
| Norway                   | NO           | 15     |
| Pakistan                 | PK           | 24     |
| Palestine                | PS           | 29     |
| Poland                   | PL           | 28     |
| Portugal                 | PT           | 25     |
| Qatar                    | QA           | 29     |
| Romania                  | RO           | 24     |
| Russia                   | RU           | 33     |
| Saint Lucia              | LC           | 32     |
| San Marino               | SM           | 27     |
| Sao Tome and Principe    | ST           | 25     |
| Saudi Arabia             | SA           | 24     |
| Senegal                  | SN           | 28     |
| Serbia                   | RS           | 22     |
| Seychelles               | SC           | 31     |
| Slovak Republic          | SK           | 24     |
| Slovenia                 | SI           | 19     |
| Somalia                  | SO           | 23     |
| Spain                    | ES           | 24     |
| Sudan                    | SD           | 18     |
| Sultanate of Oman        | OM           | 23     |
| Sweden                   | SE           | 24     |
| Switzerland              | CH           | 21     |
| Timor-Leste              | TL           | 23     |
| Togo                     | TG           | 28     |
| Tunisia                  | TN           | 24     |
| Turkey                   | TR           | 26     |
| Ukraine                  | UA           | 29     |
| United Arab Emirates     | AE           | 23     |
| United Kingdom           | GB           | 22     |
| Virgin Islands, British  | VG           | 24     |

</details>

###

# Development

## Install dependencies

```bash
npm i
```

## Test

```bash
npm run test
```

## Build

```bash
npx tsc
```

# Changelog

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
