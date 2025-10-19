# IBAN Validator

IBAN Validator for your web application forms ([Angular](#angular), [React](#react), Vue, ...), comes without any dependencies and can be used as a standalone function in any JS project. It can perform format, digit and length IBAN validations. Currently [112 countries](#supported-countries) are supported.

## Features

- Zero external dependencies
- Works in Node.js and all modern browsers
- Works with TypeScript and plain JS

## Content

- [Install](#install)
- [Basic usage](#basic-usage)
- [Error Response](#error-response)
- [Use as a form validator](#use-as-a-form-validator)
  - [Angular example](#angular)
  - [React example](#react)
- [Demo Applications](#demo)
- [Supported countries](https://github.com/SKaDiZZ/ngx-iban-validator/blob/master/SUPPORTED_COUNTRIES.md)
- [Changelog](https://github.com/SKaDiZZ/ngx-iban-validator/blob/master/CHANGELOG.md)
- [Contributing](https://github.com/SKaDiZZ/ngx-iban-validator/blob/master/CONTRIBUTING.md)
- [Code of Conduct](https://github.com/SKaDiZZ/ngx-iban-validator/blob/master/CODE_OF_CONDUCT.md)
- [License](https://github.com/SKaDiZZ/ngx-iban-validator/blob/master/LICENCE)
- [Read more](#read-more)

## Install

**npm**

```bash
npm i ngx-iban-validator
```

**pnpm**

```bash
pnpm add ngx-iban-validator
```

**yarn**

```bash
yarn add ngx-iban-validator
```

## Basic usage

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
  error: IBANError | null;
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

## Read more

[IBAN Examples](https://www.iban.com/structure)
