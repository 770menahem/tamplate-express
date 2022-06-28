import { Request, Response } from 'express';
import * as userService from '../services/user.service';

// sign in
export const signIn = async (req: Request, res: Response) => {
    const name = req.body.name;
    const password = req.body.password;
    const user = await userService.signIn(name, password);

    if (!user) res.status(404).send('user not fount');
    else res.send(user);
};

// create a new user
export const createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.send(user);
};

// update a user
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const name = req.body.name;

    const user = await userService.updateUser(userId, name);

    res.send(user);
};

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const user = await userService.deleteUser(userId);

    res.send(user);
};

// get a user
export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    res.send(user);
};

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.send(users);
};

// get a user by name
export const getUserByName = async (req: Request, res: Response) => {
    const name = req.params.name;
    const user = await userService.getUserByName(name);
    res.send(user);
};

// get a user by name and password
export const getUserByNameAndPassword = async (req: Request, res: Response) => {
    const name = req.params.name;
    const password = req.params.password;
    const user = await userService.signIn(name, password);
    res.send(user);
};
