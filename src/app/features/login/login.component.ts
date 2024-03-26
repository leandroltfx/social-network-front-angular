import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'src/app/core/services/message/message.service';
import { LoginService } from './login.service';
import { LoginRequest } from 'src/app/shared/models/request/login-request.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
    private readonly router: Router,
    private readonly authService: AuthService,
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
          this.authService.loggedUser = resultLogin.data;
          this.messageService.showMessage(resultLogin.message, 'success');
          this.router.navigate(['/home']);
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
