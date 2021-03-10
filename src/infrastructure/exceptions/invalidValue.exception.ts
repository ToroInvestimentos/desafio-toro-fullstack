export class InvalidValueError implements Error {
    public name: string = 'InvalidValueError';
    public message: string = 'Invalid value for this operation';
    public stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}