export class UserDoesntHaveAccount implements Error {
    public name: string = 'UserDoesntHaveAccount';
    public message: string = 'User does not have an account';
    public stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}