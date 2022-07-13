import { ServiceError } from './ServiceError';

export class UnauthorizedError extends ServiceError {
    constructor(message = 'Unauthorized') {
        super(401, message);
    }
}
