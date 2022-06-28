import * as express from 'express';
import * as logger from 'morgan';
import blogRouter from './routes/blog.route';
import userRouter from './routes/user.route';
import config from '../config/index';
import { errorMiddleware } from './error';
import checkConnection from './checkConnections';

require('dotenv').config();

const { port } = config.server || 6060;

/**
 * Initializing the express server
 */
export default () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(logger('dev'));

    app.use('/users', userRouter);
    app.use('/blogs', blogRouter);

    app.use(errorMiddleware);

    app.use('/isAlive', (_req, res) => {
        res.send(checkConnection() ? 'OK' : 'Not OK');
    });

    app.use('*', (_req, res) => {
        res.status(404).send('Invalid Route');
    });

    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });
};
