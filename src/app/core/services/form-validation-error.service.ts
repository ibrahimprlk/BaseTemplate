import { Injectable } from '@angular/core';
import { FormValidationErrorModel } from '../models/form-validation-error.model';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormValidationErrorService {
  constructor() {}

  Get(frm: FormValidationErrorModel) {
    if (!frm.name)
      return frm.form.get(frm.controlName)?.errors?.[frm.validateName];

    if (frm.name) {
      let currentformGroup: FormGroup = new FormGroup({});
      const names = frm.name.split('.');

      names.forEach((name) => {
        currentformGroup =
          (currentformGroup.get(name) as FormGroup) ||
          (frm.form.get(name) as FormGroup);
      });

      return currentformGroup.get(frm.controlName)?.errors?.[frm.validateName];
    }
  }
}
