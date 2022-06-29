import { IUserService } from './../src/interfaces/userService.interface';
import User from '../src/types/user.type';
import initializeMongo from '../src/mongo/initializeMongo';
import { UserRepo } from '../src/mongo/repo/user.repo';
import { userModel } from '../src/mongo/models/user.model';
import { UserService } from './../src/express/services/user.service';
import config from '../src/config/config';

let createdUser: User;
let userService: IUserService;
describe('UserService', () => {
    beforeAll(async () => {
        await initializeMongo(config.mongo.uriTest);
        userService = new UserService(new UserRepo(userModel));
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
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

    test('get user by name and password', async () => {
        const name = 'test user';
        const password = 'test password';
        const user = await userService.getUserByNameAndPassword(name, password);
        expect(user).toBeDefined();
    });
});
