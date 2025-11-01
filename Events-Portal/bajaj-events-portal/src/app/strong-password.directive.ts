import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[strongPassword]',
  standalone: true, // ✅ important for standalone mode
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: StrongPasswordDirective,
      multi: true
    }
  ]
})
export class StrongPasswordDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const valid = strongPasswordRegex.test(password);

    return valid ? null : { strongPassword: true };
  }
}
