import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SecurityApi } from '../../services/security-api';
import { CartService } from '../../../carts/services/cart.service';
import { ToastService } from '../../../../shared/services/toast.service';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
}

@Component({
  selector: 'bajaj-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css']
})
export class RegisterUser {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _securityApi = inject(SecurityApi);
  private _cart = inject(CartService);
  private _toast = inject(ToastService);

  protected form: FormGroup = this._fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]],
      confirmPassword: ['', [Validators.required]],
      role: ['customer', [Validators.required]],
      phone: ['', []],
      address: ['', []],
    },
    { validators: this.passwordsMatchValidator }
  );

  protected submitting = false;
  protected serverError = '';

  protected passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  protected strongPasswordValidator(control: any) {
    const value = String(control?.value || '');
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);
    return hasUpper && hasLower && hasDigit && hasSpecial ? null : { weak: true };
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;
    const payload: RegisterRequest = this.form.value as RegisterRequest;
    this.submitting = true;
    // Simple registration using backend users route if available; otherwise mock success
    this._securityApi.register(payload).then(() => {
      this.submitting = false;
      if (this._cart.items.length > 0) {
        this._router.navigate(['/login'], { queryParams: { registered: 'true', returnurl: '/cart' } });
      } else {
        this._toast.show('Registered successfully. You can continue or add another user.', 'success');
        this.form.reset({ role: 'customer' });
      }
    }).catch((err: any) => {
      console.error('Registration error', err);
      this.serverError = err?.error?.message || 'Registration failed. Please try again.';
      this.submitting = false;
    });
  }
}


