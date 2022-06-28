import mongoose from 'mongoose';
import config from '../../config';
import User from '../../types/user.type';

// user schema
export const userSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true, select: true },
        name: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
    },
    { versionKey: false },
);

// user model
export const userModel = mongoose.model<User>(config.mongo.userCollectionName, userSchema);
