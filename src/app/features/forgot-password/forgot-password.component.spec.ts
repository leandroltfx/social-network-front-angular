import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
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

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resetPassword', () => {

    const spyLog = spyOn(console, 'log');

    component.forgotPasswordForm = component.buildForgotPasswordForm();
    component.forgotPasswordForm.controls['userEmail'].setValue('userEmail@userEmail.com');
    component.resetPassword();
    expect(spyLog).toHaveBeenCalled();
  });

  it('resetPassword - error userEmail', () => {

    component.forgotPasswordForm = component.buildForgotPasswordForm();
    component.forgotPasswordForm.controls['userEmail'].setValue('');
    component.resetPassword();
    expect(component.forgotPasswordForm.invalid).toBeTrue();
  });
});
