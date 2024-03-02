import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('password123');
    component.login();
    expect(spyLog).toHaveBeenCalled();
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
});
