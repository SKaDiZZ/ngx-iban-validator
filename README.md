# IBAN Validator
IBAN Validator for your reactive Angular forms, comes without any dependencies and can be used even outside of Angular as standalone function in any JS project. It can perform format, digit and length IBAN validations.

## Install
```bash
npm install ngx-iban-validator --save
```

## How to use
Import validateIBAN function from ngx-iban-validator package into your component file.

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

```html
<form [formGroup]="ibanForm">
  <input type="text" formControlName="iban" />
  <small *ngIf="ibanForm.get('iban').errors && ibanForm.get('iban').errors.ibanInvalid">
    IBAN is invalid
  </small>
</form>
```

## Read more
[IBAN Examples](https://www.iban.com/structure)
