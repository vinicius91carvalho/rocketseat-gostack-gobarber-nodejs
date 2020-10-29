import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {
        // eslint-disable-next-line prettier/prettier
    }

    public async execute({ user_id }: IRequest): Promise<User[]> {
        return this.usersRepository.findAllProviders({ except_user_id: user_id });
    }
}

export default ListProvidersService;
