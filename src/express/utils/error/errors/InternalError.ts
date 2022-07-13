import { ServiceError } from './ServiceError';

export class InternalError extends ServiceError {
    constructor(message = 'Internal error') {
        super(500, message);
    }
}
