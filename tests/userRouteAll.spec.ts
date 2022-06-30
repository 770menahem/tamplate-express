import App from '../src/express/app';
import AuthMock from './mocks/auth';
import { UserController } from '../src/express/controllers/user.controller';
import { UserService } from '../src/express/services/user.service';
import UserRouter from '../src/express/routes/user.route';
import * as request from 'supertest';
import { Application } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../src/config/config';
import UserRepoMock from './mocks/userRepo';
import { encrypt } from '../src/utils/encrypt';

let app: Application;
let token: string;
const idToDelete = 'to_delete';
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

        app = new App(5770, [userRouter]).getApp();
    });

    test('POST /users/login', async () => {
        const response = await request(app).post('/users/login').send({ name: 'test user', password: 'test' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('POST /users/login wrong password', async () => {
        const response = await request(app).post('/users/login').send({ name: 'test user', password: 'test2' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to login');
    });

    test('POST /users/login wrong name', async () => {
        const response = await request(app).post('/users/login').send({ name: 'test user lol', password: 'test' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to login');
    });

    test('GET /users', async () => {
        const response = await request(app).get('/users').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET /users/:id', async () => {
        const response = await request(app).get('/users/1').set('Authorization', token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ _id: '1', name: 'test user' });
    });

    test('GET /users/:id not exist i', async () => {
        const response = await request(app).get('/users/6').set('Authorization', token);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });

    test('POST /users', async () => {
        const response = await request(app).post('/users').set('Authorization', token).send({ name: 'test user 2', password: '123' });
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('test user 2');
    });

    test('POST /users not enough fields', async () => {
        const response = await request(app).post('/users').set('Authorization', token).send({ name: 'test user 2' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"body.password" is required');
    });

    test('PUT /users/:id', async () => {
        const response = await request(app).put('/users/1').set('Authorization', token).send({ name: 'new name' });
        expect(response.status).toBe(200);
        expect(response.body.name).toEqual('new name');
    });

    test('PUT /users/:id not exist id', async () => {
        const response = await request(app).put('/users/9').set('Authorization', token).send({ name: 'new name' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to update user');
    });

    test('PUT /users/:id not enough fields', async () => {
        const response = await request(app).put('/users/1').set('Authorization', token).send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"body.name" is required');
    });

    test('DELETE /users/:id', async () => {
        const response = await request(app).delete(`/users/${idToDelete}`).set('Authorization', token);
        expect(response.status).toBe(200);
        const userResp = await request(app).get(`/users/${idToDelete}`).set('Authorization', token);
        expect(userResp.status).toBe(404);
    });

    test('DELETE /users/:id not exist id', async () => {
        const response = await request(app).delete('/users/9').set('Authorization', token);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('fail to delete user');
    });
});
