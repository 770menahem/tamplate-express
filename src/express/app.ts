import * as express from 'express';
import * as logger from 'morgan';
import { errorMiddleware } from './utils/error';
import { logInfo } from '../log/logger';
import * as cors from 'cors';
import IRouter from '../interfaces/router.interface';

require('dotenv').config();

/**
 * Initializing the express server
 */
class App {
    private port: number;
    private app: express.Application;
    private routers: IRouter[];

    constructor(port: number, routers: IRouter[]) {
        this.port = port || 1770;
        this.routers = routers;
        this.app = express();
        this.config();
        this.start();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private config(): void {
        this.app.use(logger('dev'));
        this.app.use(cors({ origin: '*', credentials: true }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRouters(): void {
        this.routers.forEach((router) => {
            this.app.use(router.path, router.router);
        });
        this.app.use(errorMiddleware);
    }

    public async start(): Promise<void> {
        this.initializeRouters();
        this.app.listen(this.port, () => logInfo(`Server started on port ${this.port}`));
    }
}

export default App;
