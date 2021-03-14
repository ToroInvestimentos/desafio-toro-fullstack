export class DatabaseException implements Error {
    name: string = 'DatabaseException';
    message: string = 'There was an error with a database operation ';
    stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}