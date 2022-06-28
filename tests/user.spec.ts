// test blogService with jest
import * as userService from '../src/express/services/user.service';
import User from '../src/types/user.type';
import initializeMongo from '../src/mongo/initializeMongo';

let createdUser: User;

describe('UserService', () => {
    beforeAll(async () => {
        await initializeMongo();
    });

    beforeEach(async () => {
        createdUser = await userService.createUser({
            name: 'test user',
            password: 'test password',
        });
    });

    test('create user', async () => {
        const newUser: User = {
            name: 'test',
            password: 'test',
        };
        const user = await userService.createUser(newUser);
        expect(user.name).toEqual(newUser.name);
        expect(user.password).not.toEqual(newUser.password);
    });

    test('update user', async () => {
        const userId = createdUser._id!;
        const name = 'test update';
        const user = await userService.updateUser(userId, name);
        expect(user!.name).toEqual('test update');
    });

    test('delete user', async () => {
        const userId = createdUser._id!;
        await userService.deleteUser(userId);
        const user = await userService.getUserById(userId);
        expect(user).toEqual(null);
    });

    test('create user', async () => {
        const newUser: User = {
            name: 'test',
            password: 'test',
        };
        const sign = await userService.createUser(newUser);
        expect(sign!.name).toEqual('test');
    });

    test('get user', async () => {
        const userId = createdUser._id!;
        const user = await userService.getUserById(userId);
        expect(user).toBeDefined();
    });

    test('get all users', async () => {
        const users = await userService.getAllUsers();
        expect(users).toBeDefined();
    });

    test('get user by name', async () => {
        const name = 'test user';
        const user = await userService.getUserByName(name);
        expect(user).toBeDefined();
    });

    test('get user by name and password', async () => {
        const name = 'test user';
        const password = 'test password';
        const user = await userService.signIn(name, password);
        expect(user).toBeDefined();
    });
});
