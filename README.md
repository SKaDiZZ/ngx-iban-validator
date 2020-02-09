# IBAN Validator
IBAN Validator for your reactive Angular forms, comes without any dependencies and can be used even outside of Angular as standalone function in any JS project. It can perform format, digit and length IBAN validations.

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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ibanForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.ibanForm = this.formBuilder.group({
      iban: ['', [
        Validators.required,
        validateIBAN
      ]]
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
  <small *ngIf="ibanForm.get('iban').errors && ibanForm.get('iban').errors.ibanInvalid">
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
 const ibanIsInvalid = validateIBAN({ value: 'AL35202111090000000001234567' }).ibanInvalid;
 ```

 # NodeJS
 ```javascript
const ibanValidator = require('ngx-iban-validator');
const ibanIsInvalid = ibanValidator.validateIBAN({ value: 'BA393385804800211234' }).ibanInvalid;
```

## Read more
[IBAN Examples](https://www.iban.com/structure)
