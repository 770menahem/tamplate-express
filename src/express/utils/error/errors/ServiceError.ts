import BaseError from './BaseError';

export class ServiceError extends BaseError {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}
