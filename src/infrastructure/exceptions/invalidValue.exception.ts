export class InvalidValueException implements Error {
    public name: string = 'InvalidValueException';
    public message: string = 'Invalid value for this operation';
    public stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}