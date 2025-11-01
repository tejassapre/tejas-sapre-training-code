import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  // 1️⃣ Validator: End date should be after start date
  static dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.get('startDate')?.value;
      const endDate = control.get('endDate')?.value;

      if (!startDate || !endDate) return null;

      const start = new Date(startDate);
      const end = new Date(endDate);

      return end >= start ? null : { dateRangeInvalid: true };
    };
  }

  // 2️⃣ Validator: Fees must be positive
  static positiveFeesValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value != null && value < 0 ? { negativeFee: true } : null;
  }
}
