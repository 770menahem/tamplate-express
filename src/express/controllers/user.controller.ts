import { Request, Response } from 'express';
import { LoginUser } from '../../types/loginUser.type';
import User from '../../types/user.type';
import * as userService from '../services/user.service';

// sign in
export const login = async (req: Request, res: Response) => {
    const name = req.body.name;
    const password = req.body.password;
    const user: LoginUser | null = await userService.login(name, password);

    if (!user) res.status(404).send({ error: 'fail to login' });
    else res.send(user);
};

// create a new user
export const createUser = async (req: Request, res: Response) => {
    const user: User | null = await userService.createUser(req.body);

    if (!user) res.status(404).send({ error: 'fail to create user' });

    res.send(user);
};

// update a user
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const name = req.body.name;

    const user: User | null = await userService.updateUser(userId, name);
    if (!user) res.status(404).send({ error: 'fail to update user' });

    res.send(user);
};

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const user: User | null = await userService.deleteUser(userId);
    if (!user) res.status(404).send({ error: 'fail to delete user' });
    else res.send({ msg: 'User deleted', user });
};

// get a user
export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user: User | null = await userService.getUserById(userId);
    if (!user) res.status(404).send('user not found');
    else res.send(user);
};

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    const users: User[] | null = await userService.getAllUsers();

    res.send(users);
};

// get a user by name
export const getUserByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const user: User | null = await userService.getUserByName(name);
    if (!user) res.status(404).send('user not found');
    else res.send(user);
};

// get a user by name and password
export const getUserByNameAndPassword = async (req: Request, res: Response) => {
    const name = req.params.name;
    const password = req.params.password;
    const user: User | null = await userService.getUserByNameAndPassword(name, password);
    if (!user) res.status(404).send('user not found');
    else res.send(user);
};
