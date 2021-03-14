export class InvalidDtoException implements Error {
    name: string = 'InvalidDtoException';
    message: string = 'Invalid DTO';
    stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}