import { NextFunction, Request, RequestHandler, Response } from 'express';
import config from '../../config/config';

interface IAuth {
    check: RequestHandler;
}

class Auth implements IAuth {
    public checkAuth: (token: string) => Promise<string | null>;

    constructor(checkAuth: (token: string) => Promise<string | null>) {
        this.checkAuth = checkAuth;
    }

    public async check(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (!config.server.needAuth) return next();

        const token: string = req.header('Authorization') as string;
        const userId = await this.checkAuth(token);
        if (!userId) {
            res.status(401).send({ error: 'unauthorized', status: 401 });
        } else {
            req['userId'] = userId;
            next();
        }
    }
}

export default Auth;
