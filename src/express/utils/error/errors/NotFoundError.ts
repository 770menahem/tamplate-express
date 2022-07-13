import { ServiceError } from './ServiceError';

export class NotFoundError extends ServiceError {
    constructor(message = 'Not found') {
        super(404, message);
    }
}
export class NotCreatedError extends ServiceError {
    constructor(message = 'Not created') {
        super(400, message);
    }
}
