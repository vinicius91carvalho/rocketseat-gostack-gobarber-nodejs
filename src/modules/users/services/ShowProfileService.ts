import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {
        // eslint-disable-next-line prettier/prettier
    }

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not found');
        }

        delete user.password;

        return user;
    }
}

export default ShowProfileService;
