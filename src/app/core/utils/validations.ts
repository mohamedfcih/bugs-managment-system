import { AbstractControl, ValidatorFn } from '@angular/forms';
import {  urlRegex } from '../constances';

export class Validations {
  static shouldContainValidator(
    value: string,
    keyError: string,
    errorMessage: string
  ): ValidatorFn {
    return (control: AbstractControl<string>) => {
      let hasValue = control.value.toLocaleLowerCase().includes(value);

      return hasValue ? null : { [keyError]: errorMessage };
    };
  }

  static urlValidator(errorMessage: string): ValidatorFn {
    return (control: AbstractControl<string>) => {
      var isValid = urlRegex.test(control.value);
      return isValid ? null : { url: errorMessage };
    };
  }
}
