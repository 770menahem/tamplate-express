import * as mongoose from 'mongoose';
import config from '../config';
import { logInfo } from '../log/logger';

const { mongo } = config;

/**
 * Connect to mongo
 */
export default async () => {
    logInfo('Connecting to Mongo');

    await mongoose.connect(mongo.uri);

    logInfo('Mongo connection established');
};
