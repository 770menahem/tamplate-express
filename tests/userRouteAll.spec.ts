import App from '../src/express/app';
import AuthMock from './mocks/auth';
import { UserController } from '../src/express/layers/controllers/user.controller';
import { UserService } from '../src/express/layers/services/user.service';
import UserRouter from '../src/express/layers/routes/user.route';
import * as request from 'supertest';
import { verify } from 'jsonwebtoken';
import config from '../src/config/config';
import UserRepoMock from './mocks/userRepo';
import { encrypt } from '../src/utils/encrypt';

let server: App;
let token: string;
const idToDelete = 'to_delete';

jest.setTimeout(60000);

describe('User routes', () => {
    beforeAll(async () => {
        const auth = new AuthMock(async (token) => {
            const payload = verify(token, config.keys.tokenKey);
            return payload.toString();
        });
        const repo = new UserRepoMock();
        repo.createUser({ _id: '1', name: 'test user', password: encrypt('test') });
        repo.createUser({ _id: idToDelete, name: 'test user', password: encrypt('test') });

        const userController = new UserController(new UserService(repo));
        const userRouter = new UserRouter(userController, auth.check);

        server = new App(5770, [userRouter]);
    });

    afterAll(async () => {
        await server.stop();
    });

    test('POST /users/login', async () => {
        const response = await request(server.getApp()).post('/users/login').send({ name: 'test user', password: 'test' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('POST /users/login wrong password', async () => {
        const response = await request(server.getApp()).post('/users/login').send({ name: 'test user', password: 'test2' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Fail to login, Error: Not found');
    });

    test('POST /users/login wrong name', async () => {
        const response = await request(server.getApp()).post('/users/login').send({ name: 'test user lol', password: 'test' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Fail to login, Error: Not found');
    });

    test('GET /users', async () => {
        const response = await request(server.getApp()).get('/users').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET /users/:id', async () => {
        const response = await request(server.getApp()).get('/users/1').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ _id: '1', name: 'test user' });
    });

    test('GET /users/:id not exist id', async () => {
        const response = await request(server.getApp()).get('/users/6').set('Authorization', token);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not found');
    });

    test('POST /users', async () => {
        const response = await request(server.getApp()).post('/users').set('Authorization', token).send({ name: 'test user 2', password: '123' });
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('test user 2');
    });

    test('POST /users not enough fields', async () => {
        const response = await request(server.getApp()).post('/users').set('Authorization', token).send({ name: 'test user 2' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"body.password" is required');
    });

    test('PUT /users/:id', async () => {
        const response = await request(server.getApp()).put('/users/1').set('Authorization', token).send({ name: 'new name' });
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('new name');
    });

    test('PUT /users/:id not exist id', async () => {
        const response = await request(server.getApp()).put('/users/9').set('Authorization', token).send({ name: 'new name' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User not updated: Error: User not found');
    });

    test('PUT /users/:id not enough fields', async () => {
        const response = await request(server.getApp()).put('/users/1').set('Authorization', token).send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"body.name" is required');
    });

    test('DELETE /users/:id', async () => {
        const response = await request(server.getApp()).delete(`/users/${idToDelete}`).set('Authorization', token);
        expect(response.status).toBe(200);
        const userResp = await request(server.getApp()).get(`/users/${idToDelete}`).set('Authorization', token);
        expect(userResp.status).toBe(404);
    });

    test('DELETE /users/:id not exist id', async () => {
        const response = await request(server.getApp()).delete('/users/9').set('Authorization', token);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User not deleted: Error: User not found');
    });
});
