import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginRequest } from 'src/app/shared/models/request/login-request.model';
import { LoginResponse } from 'src/app/shared/models/response/login-response.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(
    loginRequest: LoginRequest
  ): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.api_path}/login`, loginRequest);
  }
}
