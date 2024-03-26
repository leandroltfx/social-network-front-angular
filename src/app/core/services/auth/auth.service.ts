import { Injectable } from '@angular/core';

import { LoggedUser } from 'src/app/shared/models/dto/logged-user.model';

@Injectable()
export class AuthService {

  loggedUser!: LoggedUser;

  constructor() { }
}
