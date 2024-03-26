import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { LoginResponse } from 'src/app/shared/models/response/login-response.model';
import { MessageService } from 'src/app/core/services/message/message.service';
import { CustomError } from 'src/app/shared/testing/error/custom-error.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jasmine.SpyObj<LoginService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {

    loginService = jasmine.createSpyObj(['login']);
    messageService = jasmine.createSpyObj(['showMessage']);
    authService = jasmine.createSpyObj(['']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,

        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [
        { provide: LoginService, useValue: loginService },
        { provide: MessageService, useValue: messageService },
        { provide: AuthService, useValue: authService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login - success', () => {

    const spyNavigate = spyOn(router, 'navigate');

    loginService.login.and.returnValue(
      of(
        <LoginResponse>{
          message: 'Login efetuado com sucesso!',
          data: {
            id: '1',
            socialName: 'nome social',
            userName: 'username',
            email: 'email@email.com',
          }
        }
      )
    );

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('password123');

    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(messageService.showMessage).toHaveBeenCalled();
    expect(messageService.showMessage).toHaveBeenCalledWith('Login efetuado com sucesso!', 'success');
    expect(spyNavigate).toHaveBeenCalledWith(['/home']);
  });

  it('login - error email', () => {

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('password123');
    component.login();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('login - error password', () => {

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('');
    component.login();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('login - both fields', () => {

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.login();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('login - error', () => {

    loginService.login.and.returnValue(throwError(() => new CustomError('Email e/ou senha inválidos')));

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('password123');

    component.login();

    expect(loginService.login).toHaveBeenCalled();
    expect(messageService.showMessage).toHaveBeenCalledWith('Email e/ou senha inválidos', 'error');
  });
});
