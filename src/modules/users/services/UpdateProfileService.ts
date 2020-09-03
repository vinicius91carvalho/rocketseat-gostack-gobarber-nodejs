import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository') private usersRepository: IUsersRepository,
        @inject('HashProvider') private hashProvider: IHashProvider,
    ) {
        // eslint-disable-next-line prettier/prettier
    }

    public async execute({ user_id, name, email, password, oldPassword }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not found');
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
            throw new AppError('E-mail already in use');
        }

        user.name = name;
        user.email = email;

        if (password && !oldPassword) {
            throw new AppError('You need to inform the old password to set a new password');
        }

        if (password && oldPassword) {
            const checkOldPassword = await this.hashProvider.compareHash(oldPassword, user.password);

            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }
        }

        if (password) {
            user.password = await this.hashProvider.generateHash(password);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfileService;
