import { ValidationError } from './error/errors/ValidationError';
import { UnauthorizedError } from './error/errors/unauthorizedError';
import { forbiddenError } from './error/errors/forbiddenError';
import { BadRequestError } from './error/errors/BadRequestError';
import { Response } from 'express';
import { NotFoundError } from './error/errors/NotFoundError';
import { ServiceError } from './error/errors/ServiceError';

export abstract class ResponseHandler {
    static success(res: Response, dto?: any) {
        return res.status(200).json(dto);
    }

    static jsonResponse(res: Response, code: number, message: string) {
        return res.status(code).json({ message });
    }

    static clientError(res: Response, message?: string) {
        return this.jsonResponse(res, 400, message || 'Bad Request');
    }

    static validationError(res: Response, message?: string) {
        return this.jsonResponse(res, 400, message || 'Validation Error');
    }

    static notFound(res: Response, message?: string) {
        return this.jsonResponse(res, 404, message || 'Not found');
    }

    static conflict(res: Response, message?: string) {
        return this.jsonResponse(res, 409, message || 'Conflict');
    }

    static forbidden(res: Response, message?: string) {
        return this.jsonResponse(res, 403, message || 'Forbidden');
    }

    static unauthorized(res: Response, message?: string) {
        return this.jsonResponse(res, 401, message || 'Unauthorized');
    }

    static internal(res: Response, message?: string) {
        return this.jsonResponse(res, 500, message || 'Internal Error');
    }
}

const Response = (res: Response, error: ServiceError) => {
    if (error instanceof NotFoundError) {
        return ResponseHandler.notFound(res, error.message);
    } else if (error instanceof BadRequestError) {
        return ResponseHandler.clientError(res, error.message);
    } else if (error instanceof forbiddenError) {
        return ResponseHandler.forbidden(res, error.message);
    } else if (error instanceof UnauthorizedError) {
        return ResponseHandler.unauthorized(res, error.message);
    } else if (error instanceof ValidationError) {
        return ResponseHandler.validationError(res, error.message);
    }

    return ResponseHandler.internal(res, error.message);
};

export default Response;
