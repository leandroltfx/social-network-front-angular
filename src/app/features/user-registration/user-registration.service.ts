import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { RegisterUserRequest } from 'src/app/shared/models/request/register-user-request.model';
import { RegisterUserReponse } from 'src/app/shared/models/response/register-user-response.model';

@Injectable()
export class UserRegistrationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(
    registerUserRequest: RegisterUserRequest
  ): Observable<RegisterUserReponse> {
    return this.httpClient.post<RegisterUserReponse>(`${environment.api_path}/users`, registerUserRequest);
  }
}
