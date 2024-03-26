import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { of, throwError } from 'rxjs';

import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationService } from './user-registration.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { RegisterUserReponse } from 'src/app/shared/models/response/register-user-response.model';
import { CustomError } from 'src/app/shared/testing/error/custom-error.model';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userRegistrationService: jasmine.SpyObj<UserRegistrationService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let router: Router;

  beforeEach(async () => {

    userRegistrationService = jasmine.createSpyObj(['registerUser']);
    messageService = jasmine.createSpyObj(['showMessage']);

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
      ],
      providers: [
        { provide: UserRegistrationService, useValue: userRegistrationService },
        { provide: MessageService, useValue: messageService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('registerUser - success', () => {

    const spyNavigate = spyOn(router, 'navigate');

    userRegistrationService.registerUser.and.returnValue(
      of(
        <RegisterUserReponse>{
          message: 'Usuário criado com sucesso!'
        }
      )
    );

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('name name name');
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('password123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('password123');

    component.registerUser();

    expect(userRegistrationService.registerUser).toHaveBeenCalled();
    expect(messageService.showMessage).toHaveBeenCalledWith('Usuário criado com sucesso!', 'success');
    expect(spyNavigate).toHaveBeenCalledWith(['/login']);
  });

  it('registerUser - error', () => {

    userRegistrationService.registerUser.and.returnValue(throwError(() => new CustomError('Ocorreu um erro no sistema')));

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('name name name');
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('password123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('password123');

    component.registerUser();

    expect(userRegistrationService.registerUser).toHaveBeenCalled();
    expect(messageService.showMessage).toHaveBeenCalledWith('Ocorreu um erro no sistema', 'error');
  });

  it('registerUser - error required socialName', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('');
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('password123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('password123');
    component.registerUser();
    expect(component.userRegistrationForm.controls['socialName'].getError('required')).toBeTrue();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('registerUser - error required socialName', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('name name name');
    component.userRegistrationForm.controls['userName'].setValue('');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('password123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('password123');
    component.registerUser();
    expect(component.userRegistrationForm.controls['userName'].getError('required')).toBeTrue();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('registerUser - error required email', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('name name name');
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('');
    component.userRegistrationForm.controls['password'].setValue('password123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('password123');
    component.registerUser();
    expect(component.userRegistrationForm.controls['email'].getError('required')).toBeTrue();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('registerUser - error required password', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('name name name');
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('');
    component.userRegistrationForm.controls['confirmPassword'].setValue('password123');
    component.registerUser();
    expect(component.userRegistrationForm.controls['password'].getError('required')).toBeTrue();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('registerUser - error required confirmPassword', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('name name name');
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('password123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('');
    component.registerUser();
    expect(component.userRegistrationForm.controls['confirmPassword'].getError('required')).toBeTrue();
    expect(component.userRegistrationForm.invalid).toBeTrue();
  });

  it('updateValidatorConfirmPassword', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();
    component.userRegistrationForm.controls['socialName'].setValue('name name name');
    component.userRegistrationForm.controls['userName'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('password123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('pass');

    component.updateValidatorConfirmPassword();

    expect(component.userRegistrationForm.controls['confirmPassword'].getError('confirm')).toBeTrue();
  });
});
