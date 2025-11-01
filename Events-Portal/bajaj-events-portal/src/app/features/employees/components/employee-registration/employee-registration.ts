import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee-form-service';

@Component({
  selector: 'app-employee-registration',
    standalone: true,

  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee-registration.html',
 styleUrl: './employee-registration.css',
})

export class EmployeeRegistration {
  employeeForm: FormGroup;
  submitting = false;
  successMessage = '';
  serverError = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
   this.employeeForm = this.fb.group({
  employeeId: [2370, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  employeeName: ['Pravinkumar R. D.', [Validators.required, Validators.maxLength(100)]],
  address: ['Suncity, A8/404', Validators.required],
  city: ['Pune', Validators.required],
  zipcode: [411051, [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
  phone: ['+91 23892893', Validators.required],
  email: ['pravin.r.d@synechron.com', [Validators.required, Validators.email]],
  skillSets: ['Microsoft/JavaScript', Validators.required],
  country: ['India', Validators.required],
  joiningDate: [new Date().toISOString().substring(0, 10), Validators.required],
  avatar: ['images/noimage.png']
});

  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.serverError = '';
    this.successMessage = '';

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const payload: Employee = this.employeeForm.value;
    this.submitting = true;

    this.employeeService.create(payload).subscribe({
      next: () => {
        this.successMessage = '✅ Employee registered successfully!';
        this.employeeForm.reset({
          joiningDate: new Date().toISOString().substring(0, 10),
          avatar: 'images/noimage.png'
        });
        this.submitting = false;
      },
      error: (err) => {
        this.serverError = err?.error?.message || '❌ Failed to register employee.';
        this.submitting = false;
      }
    });
  }

  onReset() {
    this.employeeForm.reset({
      joiningDate: new Date().toISOString().substring(0, 10),
      avatar: 'images/noimage.png'
    });
  }
}

