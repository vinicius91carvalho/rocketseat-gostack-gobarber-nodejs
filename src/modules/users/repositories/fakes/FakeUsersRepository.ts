import { uuid } from 'uuidv4';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);
        return new Promise(resolve => resolve(findUser));
    }

    findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return new Promise(resolve => resolve(findUser));
    }

    create(data: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(
            user,
            {
                id: uuid(),
            },
            data,
        );

        this.users.push(user);
        return new Promise(resolve => resolve(user));
    }

    save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
        this.users[findIndex] = user;
        return new Promise(resolve => resolve(user));
    }
}
