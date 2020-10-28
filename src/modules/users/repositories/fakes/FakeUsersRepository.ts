import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if (except_user_id) {
            users = this.users.filter(user => user.id !== except_user_id);
        }

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);
        return new Promise(resolve => resolve(findUser));
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return new Promise(resolve => resolve(findUser));
    }

    public async create(data: ICreateUserDTO): Promise<User> {
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

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
        this.users[findIndex] = user;
        return new Promise(resolve => resolve(user));
    }
}
