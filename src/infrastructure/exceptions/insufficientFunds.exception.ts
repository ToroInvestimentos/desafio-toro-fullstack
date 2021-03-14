export class InsufficientFundsException implements Error {
    name: string = 'InsufficientFundsException';
    message: string = 'Insufficient funds';
    stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}