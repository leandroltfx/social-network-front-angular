import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserRegistrationService } from './user-registration.service';
import { RegisterUserRequest } from 'src/app/shared/models/request/register-user-request.model';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private userRegistrationService: UserRegistrationService,
    private messageService: MessageService,
    private router: Router
  ) { }

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
      const registerUserRequest = new RegisterUserRequest(
        this.userRegistrationForm.controls['socialName'].value,
        this.userRegistrationForm.controls['userName'].value,
        this.userRegistrationForm.controls['email'].value,
        this.userRegistrationForm.controls['password'].value,
      );
      this.userRegistrationService.registerUser(registerUserRequest)
        .subscribe(
          resultRegisterUser => {
            this.messageService.showMessage(resultRegisterUser.message, 'success');
            this.router.navigate(['/login']);
          },
          errorRegisterUser => {
            this.messageService.showMessage(errorRegisterUser.error.message, 'error');
          }
        );
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
