

export class ErrorApp {
    constructor(message, statusCode, stack) {
        this.message = message;
        this.statusCode = statusCode;
        this.stack = stack;
    }
}