/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import config from '../config';
import Blog from '../types/blogType';

const { mongo } = config;

const blogSchema = new mongoose.Schema<Blog>(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true, select: false },
        name: { type: String, required: true },
        description: { type: String, required: true },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
    },
    { versionKey: false },
);

const blogModel = mongoose.model(mongo.collectionName, blogSchema);

export default blogModel;
