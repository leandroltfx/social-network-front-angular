import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sn-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegistrationForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  patternUserName: RegExp = /^[a-zA-Z]\w*$/;
  patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  patternPassword: RegExp = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.buildUserRegistrationForm();
  }

  buildUserRegistrationForm(): FormGroup {
    return this.formBuilder.group({
      socialName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      userName: [null, [Validators.required, Validators.pattern(this.patternUserName), Validators.minLength(3), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.pattern(this.patternEmail)]],
      password: [null, [Validators.required, Validators.pattern(this.patternPassword), Validators.maxLength(100)]],
      confirmPassword: [null, [Validators.required, this.validatorConfirmPassword]],
    });
  }

  updateValidatorConfirmPassword(): void {
    Promise.resolve().then(() => this.userRegistrationForm.controls['confirmPassword'].updateValueAndValidity());
  }

  validatorConfirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userRegistrationForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  registerUser(): void {
    if (this.userRegistrationForm.valid) {
      console.log('registerUser');
    } else {
      Object.values(this.userRegistrationForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

}
