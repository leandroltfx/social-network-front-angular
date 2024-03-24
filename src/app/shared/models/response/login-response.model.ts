import { LoggedUser } from "../dto/logged-user.model";

export class LoginResponse {

    message!: string;
    data!: LoggedUser;

}
