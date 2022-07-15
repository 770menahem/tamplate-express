import { IUserService } from '../../../interfaces/userService.interface';
import { Request, Response } from 'express';
import { LoginUser } from '../../../types/loginUser.type';
import User from '../../../types/user.type';
import { IUserController } from '../../../interfaces/userController.interface';
import { ResponseHandler } from '../../utils/responseHandler';

export class UserController implements IUserController {
    private UserService: IUserService;

    constructor(UserService: IUserService) {
        this.UserService = UserService;
    }

    public login = async (req: Request, res: Response) => {
        const name = req.body.name;
        const password = req.body.password;
        const user: LoginUser = await this.UserService.login(name, password);

        ResponseHandler.success(res, user);
    };

    public createUser = async (req: Request, res: Response) => {
        const user: User = await this.UserService.createUser(req.body);

        ResponseHandler.success(res, user);
    };

    public updateUser = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const name = req.body.name;

        const user: User = await this.UserService.updateUser(userId, name);

        ResponseHandler.success(res, user);
    };

    public deleteUser = async (req: Request, res: Response) => {
        const userId = req.params.userId;

        const user: User = await this.UserService.deleteUser(userId);

        ResponseHandler.success(res, { msg: 'User deleted', user });
    };

    public getUserById = async (req: Request, res: Response) => {
        const userId = req.params.userId;
        const user: User = await this.UserService.getUserById(userId);

        ResponseHandler.success(res, user);
    };

    public getAllUsers = async (_req: Request, res: Response) => {
        const users: User[] = await this.UserService.getAllUsers();

        ResponseHandler.success(res, users);
    };

    public getUserByNameAndPassword = async (req: Request, res: Response) => {
        const name = req.params.name;
        const password = req.params.password;
        const user: User = await this.UserService.getUserByNameAndPassword(name, password);

        ResponseHandler.success(res, user);
    };
}
