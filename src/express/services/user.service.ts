import { generateToken } from '../../auth/token';
// import * as userRepo from '../../mongo/repo/user.repo';
import User from '../../types/user.type';
import { UserRepo } from '../../types/userRepo.type';
import { encrypt } from '../../utils/encrypt';

// // create a new user
// export const createUser = async (user: User) => {
//     const newUser = await userRepo.createUser({
//         name: user.name,
//         password: encrypt(user.password),
//     });

//     return newUser;
// };

// // update a user
// export const updateUser = async (userId: string, name: string) => {
//     const user = await userRepo.updateUser(userId, name);
//     return user;
// };

// // delete a user
// export const deleteUser = async (userId: string) => {
//     const user = await userRepo.deleteUser(userId);
//     return user;
// };

// // get a user
// export const getUserById = async (userId: string) => {
//     const user = await userRepo.getUserById(userId);
//     return user;
// };

// // get all users
// export const getAllUsers = async () => {
//     const users = await userRepo.getAllUsers();
//     return users;
// };

// // get a user by name
// export const getUserByName = async (name: string) => {
//     const user = await userRepo.getUserByName(name);
//     return user;
// };

// // get a user by name and password
// export const getUserByNameAndPassword = async (name: string, password: string) => {
//     const user = await userRepo.getUserByNameAndPassword(name, encrypt(password));
//     return user;
// };

// // sign in
// export const login = async (name: string, password: string) => {
//     const user = await getUserByNameAndPassword(name, password);

//     if (!user) return null;

//     const token = generateToken(user._id!.toString());
//     return { user, token };
// };

export class UserService {
    private UserRepo: UserRepo;

    constructor(userRepo: UserRepo) {
        console.log('UserService created');
        this.UserRepo = userRepo;
    }

    // create a new user
    public createUser = async (user: User) => {
        const newUser = await this.UserRepo.createUser({
            name: user.name,
            password: encrypt(user.password),
        });

        return newUser;
    };

    // update a user
    public updateUser = async (userId: string, name: string) => {
        const user = await this.UserRepo.updateUser(userId, name);
        return user;
    };

    // delete a user
    public deleteUser = async (userId: string) => {
        const user = await this.UserRepo.deleteUser(userId);
        return user;
    };

    // get a user
    public getUserById = async (userId: string) => {
        const user = await this.UserRepo.getUserById(userId);
        return user;
    };

    // get all users
    public getAllUsers = async () => {
        const users = await this.UserRepo.getAllUsers();
        return users;
    };

    // get a user by name and password
    public getUserByNameAndPassword = async (name: string, password: string) => {
        const user = await this.UserRepo.getUserByNameAndPassword(name, encrypt(password));
        return user;
    };

    // sign in
    public login = async (name: string, password: string) => {
        const user = await this.getUserByNameAndPassword(name, password);

        if (!user) return null;

        const token = generateToken(user._id!.toString());
        return { user, token };
    };
}
