import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import {FormBuilder, Validators, ReactiveFormsModule, FormGroup} from '@angular/forms';

import { validateIBAN } from "ngx-iban-validator";

@Component({
  selector: 'app-root',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
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
