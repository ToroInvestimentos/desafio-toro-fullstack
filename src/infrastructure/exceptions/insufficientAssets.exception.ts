export class InsufficientAssets implements Error {
    public name: string = 'InsufficientAssets';
    public message: string = 'Insufficient assets for this operation';
    public stack?: string | undefined;

    /**
     *
     */
    constructor(message?: string) {
        if (message) this.message = message;
    }

}