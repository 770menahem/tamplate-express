import { ServiceError } from './ServiceError';

export class BadRequestError extends ServiceError {
    constructor(message = 'Bad Request') {
        super(400, message);
    }
}
