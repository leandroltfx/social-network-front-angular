import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginRequest } from 'src/app/shared/models/request/login-request.model';
import { LoginService } from './login.service';
import { MessageService } from 'src/app/shared/services/message/message.service';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService
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
      ).subscribe(
        resultLogin => {
          this.messageService.showMessage(resultLogin.message, 'success');
        },
        errorLogin => {
          this.messageService.showMessage(errorLogin.error.message, 'error');
        }
      );
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
