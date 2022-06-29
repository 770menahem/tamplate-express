import * as express from 'express';
import * as logger from 'morgan';
import config from '../config/config';
import { errorMiddleware } from './utils/error';
import checkConnection from './utils/checkConnections';
import { logInfo } from '../log/logger';
import * as cors from 'cors';
import IRouter from '../interfaces/router.interface';

require('dotenv').config();

const { port } = config.server || 2770;

/**
 * Initializing the express server
 */
class App {
    public app: express.Application;
    public routers: IRouter[];

    constructor(routers: IRouter[]) {
        this.app = express();
        this.config();
        this.routers = routers;
        this.start();
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
        if (checkConnection()) {
            this.initializeRouters();
            this.app.listen(port, () => logInfo(`Server started on port ${port}`));
        } else {
            logInfo('Server not started');
        }
    }
}

export default App;
