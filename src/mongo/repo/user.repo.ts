import mongoose from 'mongoose';
import User from '../../types/user.type';
// import { userModel } from '../models/user.model';

// // create user
// export const createUser = async (user: User): Promise<User> => {
//     const newUser = await userModel.create(user);
//     return newUser;
// };

// // update user
// export const updateUser = async (userId: string, name: string): Promise<User | null> => {
//     const user = await userModel.findByIdAndUpdate(userId, { name }, { new: true });
//     return user;
// };

// // delete user
// export const deleteUser = async (userId: string): Promise<User | null> => {
//     const user = await userModel.findByIdAndDelete(userId);
//     return user;
// };

// // get user
// export const getUserById = async (userId: string): Promise<User | null> => {
//     const user = await userModel.findById(userId, { password: 0 });
//     return user;
// };

// // get all users
// export const getAllUsers = async (): Promise<User[] | null> => {
//     const users = await userModel.find({}, { password: 0 });
//     return users;
// };

// // get a user by name
// export const getUserByName = async (name: string): Promise<User | null> => {
//     const user = await userModel.findOne({ name }, { password: 0 });
//     return user;
// };

// // get a user by name and password
// export const getUserByNameAndPassword = async (name: string, password: string): Promise<User | null> => {
//     const user = await userModel.findOne({ name, password }, { password: 0 });
//     return user;
// };

export class UserRepo {
    private UserModel: mongoose.Model<User>;

    constructor(userModel: mongoose.Model<User>) {
        console.log('UserRepo created');
        this.UserModel = userModel;
    }

    // get user by userId
    public getUserById = async (userId: string): Promise<User | null> => {
        const user = await this.UserModel.findById(userId, { password: 0 });
        return user;
    };

    public createUser = async (user: User): Promise<User> => {
        const newUser = await this.UserModel.create(user);
        return newUser;
    };

    public updateUser = async (userId: string, name: string): Promise<User | null> => {
        const user = await this.UserModel.findByIdAndUpdate(userId, { name }, { new: true });
        return user;
    };

    public deleteUser = async (userId: string): Promise<User | null> => {
        const user = await this.UserModel.findByIdAndDelete(userId);
        return user;
    };

    public getUser = async (userId: string): Promise<User | null> => {
        const user = await this.UserModel.findById(userId, { password: 0 });
        return user;
    };

    public getAllUsers = async (): Promise<User[] | null> => {
        const users = await this.UserModel.find({}, { password: 0 });
        return users;
    };

    public getUserByNameAndPassword = async (name: string, password: string): Promise<User | null> => {
        const user = await this.UserModel.findOne({ name, password }, { password: 0 });
        return user;
    };
}
