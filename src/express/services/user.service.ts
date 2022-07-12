import { NotCreatedError, NotFoundError } from './../error/errors/NotFoundError';
import { generateToken } from '../../auth/token';
import { IUserRepo } from '../../interfaces/userRepo.interface';
import { IUserService } from '../../interfaces/userService.interface';
import { logInfo } from '../../log/logger';
import User from '../../types/user.type';
import { decrypt, encrypt } from '../../utils/encrypt';
import { verify } from 'jsonwebtoken';
import config from '../../config/config';
import { UnauthorizedError } from '../error/errors/unauthorizedError';
import { LoginUser } from '../../types/loginUser.type';

export class UserService implements IUserService {
    private UserRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        logInfo('UserService created');
        this.UserRepo = userRepo;
    }

    public auth = async (token: string): Promise<string> => {
        const payload: any = verify(token, config.keys.tokenKey);

        if (!payload || !payload.userIdEnc) throw new UnauthorizedError('No token provided');

        const userId = decrypt(payload.userIdEnc);

        const user = await this.getUserById(userId);

        if (!user) throw new UnauthorizedError();

        return userId;
    };

    public createUser = async (user: User): Promise<User> => {
        try {
            const newUser = await this.UserRepo.createUser({
                name: user.name,
                password: encrypt(user.password!),
            });

            return newUser;
        } catch (error) {
            throw new NotCreatedError('User not created: ' + error);
        }
    };

    public updateUser = async (userId: string, name: string): Promise<User> => {
        try {
            const user = await this.UserRepo.updateUser(userId, name);

            if (!user) throw new NotFoundError('User not found');

            return user;
        } catch (error) {
            throw new NotCreatedError('User not updated: ' + error);
        }
    };

    public deleteUser = async (userId: string): Promise<User> => {
        try {
            const user = await this.UserRepo.deleteUser(userId);

            if (!user) throw new NotFoundError('User not found');

            return user;
        } catch (error) {
            throw new NotCreatedError('User not deleted: ' + error);
        }
    };

    public getUserById = async (userId: string): Promise<User> => {
        const user = await this.UserRepo.getUserById(userId);

        if (!user) throw new NotFoundError();

        return user;
    };

    public getAllUsers = async (): Promise<User[]> => {
        const users = await this.UserRepo.getAllUsers();

        return users || [];
    };

    public getUserByNameAndPassword = async (name: string, password: string): Promise<User> => {
        const user = await this.UserRepo.getUserByNameAndPassword(name, encrypt(password));

        if (!user) throw new NotFoundError();

        return user;
    };

    public login = async (name: string, password: string): Promise<LoginUser> => {
        try {
            const user = await this.getUserByNameAndPassword(name, password);

            const token = generateToken(user._id!.toString());
            return { user, token };
        } catch (error) {
            throw new NotFoundError('Fail to login, ' + error);
        }
    };
}
