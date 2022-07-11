import { Response } from 'express'

export default abstract class ResponseHandler {

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

    static internal(res: Response, message?: string) {
        return this.jsonResponse(res, 500, message || 'Internal Error');
    }

}