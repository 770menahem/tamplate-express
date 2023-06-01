import { ServiceError } from './ServiceError';

export class ValidationError extends ServiceError {
    constructor(message = 'Validation Error') {
        super(400, message);
    }
}
