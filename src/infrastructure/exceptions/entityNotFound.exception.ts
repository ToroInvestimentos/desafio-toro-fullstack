export class EntityNotFoundException implements Error {
    name: string = 'EntityNotFoundException';
    message: string = 'Entity not found ';
    stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}