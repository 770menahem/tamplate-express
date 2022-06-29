import User from '../../src/types/user.type';
import { IUserRepo } from './../../src/interfaces/userRepo.interface';

class UserRepoMock implements IUserRepo {
    public getUserById = async (userId: string): Promise<User | null> => {
        if (userId === '1') return null;

        return {
            _id: userId,
            name: 'user',
        } as User;
    };

    public getUserByNameAndPassword = async (name: string, _password: string): Promise<User | null> => {
        if (name === '1') return null;

        return {
            _id: 'dcmi3245rfwr4',
            name,
        } as User;
    };

    public createUser = async (user: User) => {
        return user;
    };

    public updateUser = async (userId: string, name: string) => {
        if (userId === '1') return null;

        return {
            _id: userId,
            name,
        } as User;
    };

    public deleteUser = async (userId: string) => {
        if (userId === '1') return null;

        return {
            _id: userId,
            name: 'deleted user',
        } as User;
    };

    public getUser = async (userId: string) => {
        if (userId === '1') return null;

        return {
            _id: userId,
            name: 'user',
        } as User;
    };

    public getAllUsers = async () => {
        return [
            {
                _id: '1',
                name: 'test',
            },
        ] as User[];
    };
}

export default UserRepoMock;
