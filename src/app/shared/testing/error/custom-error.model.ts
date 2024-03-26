export class CustomError extends Error {

    error = {};

    constructor(message: string) {
        super(message);
        this.error = { message };
    }

};