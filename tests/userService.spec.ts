import { NotFoundError } from './../src/express/utils/error/errors/NotFoundError';
import { IUserService } from '../src/interfaces/userService.interface';
import User from '../src/types/user.type';
import { UserService } from '../src/express/layers/services/user.service';
import UserRepoMock from './mocks/userRepo';
import { encrypt } from '../src/utils/encrypt';

let userService: IUserService;

jest.setTimeout(60000);

describe('UserService', () => {
    beforeEach(async () => {
        const rep = new UserRepoMock();
        userService = new UserService(rep);
        await rep.createUser({
            _id: '1',
            name: 'name1',
            password: encrypt('pass1'),
        });
        await rep.createUser({
            _id: '2',
            name: 'name2',
            password: encrypt('pass2'),
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
        const userId = '1';
        const name = 'test update';
        const user = await userService.updateUser(userId, name);
        expect(user!.name).toEqual('test update');
    });

    test('delete user', async () => {
        try {
            const userId = '2';
            await userService.deleteUser(userId);
            await userService.getUserById(userId);
            expect(true).toBeFalsy();
        } catch (e) {
            expect(e).toBeInstanceOf(NotFoundError);
        }
    });

    test('get user', async () => {
        const userId = '1';
        const user = await userService.getUserById(userId);
        expect(user).toBeDefined();
    });

    test('get all users', async () => {
        const users = await userService.getAllUsers();
        expect(users).toBeDefined();
    });

    test('get user by name and password', async () => {
        const name = 'name1';
        const password = 'pass1';
        const user = await userService.getUserByNameAndPassword(name, password);
        expect(user).toBeDefined();
    });

    test('login', async () => {
        const name = 'name1';
        const password = 'pass1';
        const user = await userService.login(name, password);
        expect(user).toBeDefined();
    });

    test('fail to login', async () => {
        try {
            const name = 'test not user';
            const password = 'test';
            await userService.login(name, password);
            // fail if error wasn't thrown
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(NotFoundError);
        }
    });
});
