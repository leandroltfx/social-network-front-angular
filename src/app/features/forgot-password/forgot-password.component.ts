import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sn-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.buildForgotPasswordForm();
  }

  buildForgotPasswordForm(): FormGroup {
    return this.formBuilder.group({
      userEmail: [null, [Validators.required]],
    });
  }

  resetPassword(): void {
    if (this.forgotPasswordForm.valid) {
      console.log('reset');
    } else {
      Object.values(this.forgotPasswordForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

}
