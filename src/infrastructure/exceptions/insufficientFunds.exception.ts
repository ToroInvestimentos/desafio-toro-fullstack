export class InsufficientFundsError implements Error {
    name: string = 'InsufficientFundsError';
    message: string = 'Insufficient funds';
    stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}