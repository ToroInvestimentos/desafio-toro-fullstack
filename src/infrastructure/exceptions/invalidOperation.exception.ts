export class InvalidOperationException implements Error {
    public name: string = 'InvalidOperationException';
    public message: string = 'Invalid operation';
    public stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}