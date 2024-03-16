import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,

        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', () => {

    const spyLog = spyOn(console, 'log');

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['userEmail'].setValue('userEmail@userEmail.com');
    component.loginForm.controls['userPassword'].setValue('password123');
    component.login();
    expect(spyLog).toHaveBeenCalled();
  });

  it('login - error userEmail', () => {

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['userEmail'].setValue('');
    component.loginForm.controls['userPassword'].setValue('password123');
    component.login();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('login - error userPassword', () => {

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['userEmail'].setValue('userEmail@userEmail.com');
    component.loginForm.controls['userPassword'].setValue('');
    component.login();
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('login - both fields', () => {

    component.loginForm = component.buildLoginForm();
    component.loginForm.controls['userEmail'].setValue('');
    component.loginForm.controls['userPassword'].setValue('');
    component.login();
    expect(component.loginForm.invalid).toBeTrue();
  });
});
