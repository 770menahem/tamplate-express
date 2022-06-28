import { generateToken } from '../../auth/token';
import * as userRepo from '../../mongo/repo/user.repo';
import User from '../../types/user.type';
import { encrypt } from '../../utils/encrypt';

// create a new user
export const createUser = async (user: User) => {
    const newUser = await userRepo.createUser({
        name: user.name,
        password: encrypt(user.password),
    });

    return newUser;
};

// update a user
export const updateUser = async (userId: string, name: string) => {
    const user = await userRepo.updateUser(userId, name);
    return user;
};

// delete a user
export const deleteUser = async (userId: string) => {
    const user = await userRepo.deleteUser(userId);
    return user;
};

// get a user
export const getUserById = async (userId: string) => {
    const user = await userRepo.getUserById(userId);
    return user;
};

// get all users
export const getAllUsers = async () => {
    const users = await userRepo.getAllUsers();
    return users;
};

// get a user by name
export const getUserByName = async (name: string) => {
    const user = await userRepo.getUserByName(name);
    return user;
};

// get a user by name and password
export const signIn = async (name: string, password: string) => {
    const user = await userRepo.getUserByNameAndPassword(name, encrypt(password));

    if (!user) return null;

    const token = generateToken(user._id.toString());
    return { user, token };
};
