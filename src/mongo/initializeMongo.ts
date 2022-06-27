import * as mongoose from 'mongoose';
import config from '../config';

const { mongo } = config;

/**
 * Connect to mongo
 */
export default async () => {
    console.log('Connecting to Mongo');

    await mongoose.connect(mongo.uri);

    console.log('Mongo connection established');
};
