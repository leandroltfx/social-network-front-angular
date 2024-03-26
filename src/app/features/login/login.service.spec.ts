import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable } from 'rxjs';

import { LoginService } from './login.service';
import { LoginResponse } from 'src/app/shared/models/response/login-response.model';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        LoginService
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login', () => {
    const result = service.login({ email: 'email', password: 'password' });
    expect(Object.keys(result).length).toBeGreaterThan(1);
  });
});
