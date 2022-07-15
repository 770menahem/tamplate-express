import * as express from 'express';
import { logError } from '../../../log/logger';
import Response from '../responseHandler';
import { ServiceError } from './errors/ServiceError';

/**
 * Error middleware, handles the error by the status code.
 * @param { Error } error - The error
 * @param { express.Request } _req - The request object.
 * @param { express.Response } res - The result object
 * @param { express.NextFunction } _next - The next function
 */

export const errorMiddleware = (error: ServiceError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logError(JSON.stringify(error));
    return Response(res, error);
};
