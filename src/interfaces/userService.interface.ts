import { LoginUser } from '../types/loginUser.type';
import User from '../types/user.type';

export interface IUserService {
    createUser(user: User): Promise<User>;
    updateUser(userId: string, name: string): Promise<User>;
    deleteUser(userId: string): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserByNameAndPassword(name: string, password: string): Promise<User>;
    login(name: string, password: string): Promise<LoginUser>;
    auth(token: string): Promise<string>;
}
