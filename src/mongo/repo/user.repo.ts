import User from '../../types/user.type';
import { userModel } from '../models/user.model';

// create user
export const createUser = async (user: User) => {
    const newUser = await userModel.create(user);
    return newUser;
};

// update user
export const updateUser = async (userId: string, name: string) => {
    const user = await userModel.findByIdAndUpdate(userId, { name }, { new: true });
    return user;
};

// delete user
export const deleteUser = async (userId: string) => {
    const user = await userModel.findByIdAndDelete(userId);
    return user;
};

// get user
export const getUserById = async (userId: string) => {
    const user = await userModel.findById(userId, { password: 0 });
    return user;
};

// get all users
export const getAllUsers = async () => {
    const users = await userModel.find({}, { password: 0 });
    return users;
};

// get a user by name
export const getUserByName = async (name: string) => {
    const user = await userModel.findOne({ name }, { password: 0 });
    return user;
};

// get a user by name and password
export const getUserByNameAndPassword = async (name: string, password: string) => {
    const user = await userModel.findOne({ name, password }, { password: 0 });
    return user;
};
