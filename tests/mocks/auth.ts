import { Request, Response, NextFunction } from 'express-serve-static-core';
import IAuth from './../../src/interfaces/auth.interface';

class AuthMock implements IAuth {
    public checkAuth: (token: string) => Promise<string | null>;

    constructor(checkAuth: (token: string) => Promise<string | null>) {
        this.checkAuth = checkAuth;
    }

    public async check(req: Request, res: Response, next: NextFunction): Promise<void> {
        const token: string = req.header('Authorization') as string;
        const userId = token;
        if (!userId) {
            res.status(401).send({ error: 'unauthorized', status: 401 });
        } else {
            req['userId'] = userId;
            next();
        }
    }
}

export default AuthMock;
