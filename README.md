# IBAN Validator

IBAN Validator for your reactive Angular forms, comes without any dependencies and can be used even outside of Angular as standalone function in any JS project. It can perform format, digit and length IBAN validations. Currently supports 79 countries

## Install

```bash
npm install ngx-iban-validator --save
```

## Use as a form validator

Import validateIBAN function from ngx-iban-validator package into your component file. Add validateIBAN to your form validators array.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validateIBAN } from 'ngx-iban-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ibanForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.ibanForm = this.formBuilder.group({
      iban: ['', [Validators.required, validateIBAN]],
    });
  }
}
```

## Display error

Validator is returning object as result of checks.

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

```html
<form [formGroup]="ibanForm">
  <input type="text" formControlName="iban" />
  <small
    *ngIf="ibanForm.get('iban').errors && ibanForm.get('iban').errors.ibanInvalid"
  >
    <span *ngIf="ibanForm.get('iban').errors.error.countryUnsupported">
      Country not supported
    </span>
    <span *ngIf="ibanForm.get('iban').errors.error.codeLengthInvalid">
      IBAN Code length is invalid
    </span>
    <span *ngIf="ibanForm.get('iban').errors.error.patternInvalid">
      IBAN Code pattern is invalid
    </span>
  </small>
</form>
```

## Use as standalone function

You can use validateIBAN function independently from any forms. Function will check IBAN and return object { ibanInvalid: boolean }

```typescript
const ibanIsInvalid = validateIBAN({
  value: 'AL35202111090000000001234567',
}).ibanInvalid;
```

# NodeJS

```javascript
const ibanValidator = require('ngx-iban-validator');
const ibanIsInvalid = ibanValidator.validateIBAN({
  value: 'BA393385804800211234',
}).ibanInvalid;
```

# Supported countries

| Country                 | Country Code | Length |
| ----------------------- | ------------ | ------ |
| Albania                 | AL           | 28     |
| Andorra                 | AD           | 24     |
| Austria                 | AT           | 20     |
| Azerbaijan              | AZ           | 28     |
| Bahrain                 | BH           | 22     |
| Belarus                 | BY           | 28     |
| Belgium                 | BE           | 16     |
| Bosnia and Herzegovina  | BA           | 20     |
| Brazil                  | BR           | 29     |
| Bulgaria                | BG           | 22     |
| Costa Rica              | CR           | 22     |
| Croatia                 | HR           | 21     |
| Cyprus                  | CY           | 28     |
| Czech Republic          | CZ           | 24     |
| Denmark                 | DK           | 18     |
| Dominican Republic      | DO           | 28     |
| Egypt                   | EG           | 29     |
| El Salvador             | SV           | 28     |
| Estonia                 | EE           | 20     |
| Faroe Islands           | FO           | 18     |
| Finland                 | FI           | 18     |
| France                  | FR           | 27     |
| Georgia                 | GE           | 22     |
| Germany                 | DE           | 22     |
| Gibraltar               | GI           | 23     |
| Greece                  | GR           | 27     |
| Greenland               | GL           | 18     |
| Guatemala               | GT           | 28     |
| Vatican                 | VA           | 22     |
| Hungary                 | HU           | 28     |
| Iceland                 | IS           | 26     |
| Iraq                    | IQ           | 23     |
| Ireland                 | IE           | 22     |
| Israel                  | IL           | 23     |
| Italy                   | IT           | 27     |
| Jordan                  | JO           | 30     |
| Kazakhstan              | KZ           | 20     |
| Kosovo                  | XK           | 20     |
| Kuwait                  | KW           | 30     |
| Latvia                  | LV           | 21     |
| Lebanon                 | LB           | 28     |
| Libya                   | LY           | 25     |
| Liechtenstein           | LI           | 21     |
| Lithuania               | LT           | 20     |
| Luxembourg              | LU           | 20     |
| Malta                   | MT           | 31     |
| Mauritania              | MR           | 27     |
| Mauritius               | MU           | 30     |
| Moldova                 | MD           | 24     |
| Monaco                  | MC           | 27     |
| Montenegro              | ME           | 22     |
| Netherlands             | NL           | 18     |
| North Macedonia         | MK           | 19     |
| Norway                  | NO           | 15     |
| Pakistan                | PK           | 24     |
| Palestine               | PS           | 29     |
| Poland                  | PL           | 28     |
| Portugal                | PT           | 25     |
| Qatar                   | QA           | 29     |
| Romania                 | RO           | 24     |
| Saint Lucia             | LC           | 32     |
| San Marino              | SM           | 27     |
| Sao Tome and Principe   | ST           | 25     |
| Saudi Arabia            | SA           | 24     |
| Serbia                  | RS           | 22     |
| Seychelles              | SC           | 31     |
| Slovak Republic         | SK           | 24     |
| Slovenia                | SI           | 19     |
| Spain                   | ES           | 24     |
| Sudan                   | SD           | 18     |
| Sweden                  | SE           | 24     |
| Switzerland             | CH           | 21     |
| Timor-Leste             | TL           | 23     |
| Tunisia                 | TN           | 24     |
| Turkey                  | TR           | 26     |
| Ukraine                 | UA           | 29     |
| United Arab Emirates    | AE           | 23     |
| United Kingdom          | GB           | 22     |
| Virgin Islands, British | VG           | 24     |

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

# v 1.1.3

Added support for new countries Vatican, Libya, Sao Tome and Principe, Sudan
Updated length for LC Saint Lucia from 30 to 32

Added Tests
Added Mocha and Chai for testing

# v 1.1.2

Updated length for CR to 22 - @freddy36

## Read more

[IBAN Examples](https://www.iban.com/structure)
