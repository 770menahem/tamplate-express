import { ServiceError } from './ServiceError';

export class forbiddenError extends ServiceError {
    constructor(message = 'Permission denied') {
        super(403, message);
    }
}
