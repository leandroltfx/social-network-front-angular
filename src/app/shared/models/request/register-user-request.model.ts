export class RegisterUserRequest {

    constructor(
        socialName: string,
        userName: string,
        email: string,
        password: string,
    ) {
        this.socialName = socialName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    socialName!: string;
    userName!: string;
    email!: string;
    password!: string;

}
