import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable } from 'rxjs';

import { UserRegistrationService } from './user-registration.service';
import { RegisterUserReponse } from 'src/app/shared/models/response/register-user-response.model';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserRegistrationService
      ]
    });
    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registerUser', () => {
    const result = service.registerUser({ email: 'email', password: 'password', socialName: 'socialName', userName: 'userName' });
    expect(Object.keys(result).length).toBeGreaterThan(1);
  });
});
