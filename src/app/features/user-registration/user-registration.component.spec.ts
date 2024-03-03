import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegistrationComponent],
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

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login', () => {

    const spyLog = spyOn(console, 'log');

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['userEmail'].setValue('email@email.com');
    component.userRegistrationForm.controls['userPassword'].setValue('password123');
    component.userRegistrationForm.controls['userConfirmPassword'].setValue('password123');
    component.registerUser();
    expect(spyLog).toHaveBeenCalled();
  });

  it('login - error userName', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['userName'].setValue('');
    component.userRegistrationForm.controls['userEmail'].setValue('email@email.com');
    component.userRegistrationForm.controls['userPassword'].setValue('password123');
    component.userRegistrationForm.controls['userConfirmPassword'].setValue('password123');
    component.registerUser();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('login - error userEmail', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['userEmail'].setValue('');
    component.userRegistrationForm.controls['userPassword'].setValue('password123');
    component.userRegistrationForm.controls['userConfirmPassword'].setValue('password123');
    component.registerUser();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('login - error userPassword', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['userEmail'].setValue('email@email.com');
    component.userRegistrationForm.controls['userPassword'].setValue('');
    component.userRegistrationForm.controls['userConfirmPassword'].setValue('password123');
    component.registerUser();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('login - error userConfirmPassword', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['userEmail'].setValue('email@email.com');
    component.userRegistrationForm.controls['userPassword'].setValue('password123');
    component.userRegistrationForm.controls['userConfirmPassword'].setValue('');
    component.registerUser();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('login - all fields', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['userName'].setValue('');
    component.userRegistrationForm.controls['userEmail'].setValue('');
    component.userRegistrationForm.controls['userPassword'].setValue('');
    component.userRegistrationForm.controls['userConfirmPassword'].setValue('');
    component.registerUser();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });
});
