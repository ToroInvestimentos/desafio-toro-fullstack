export class HttpError {
    public statusCode: number;
    public message: any;

    /**
     *
     */
    constructor(code: number, message: any) {
        this.statusCode = code;
        this.message = message;
    }
}