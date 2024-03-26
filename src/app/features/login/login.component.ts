import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'src/app/shared/services/message/message.service';
import { LoginService } from './login.service';
import { LoginRequest } from 'src/app/shared/models/request/login-request.model';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginRequest = new LoginRequest(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value,
      );
      this.loginService.login(
        loginRequest
      ).subscribe({
        next: resultLogin => {
          this.messageService.showMessage(resultLogin.message, 'success');
        },
        error: errorLogin => {
          this.messageService.showMessage(errorLogin?.error?.message, 'error');
        }
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

}
