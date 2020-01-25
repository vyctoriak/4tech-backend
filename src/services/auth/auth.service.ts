import { Injectable, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { UserService } from '../user/user.service';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/repositories/user-repository/user-repository/user-repository';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository,
                private JwtService: JwtService) {
    }

    async login(login: LoginViewModel) {
        const user = await this.userRepository.getByCredentials(login.userLogin, login.password);

        if (!user) {
            throw new BadRequestException('Incorret Credentials');
        }

        return {
            acess_token: this.JwtService.sign({ status: 'Authorized' }),
            userId: user._id
        };

        // if (user) {
        //     return 'Authenticated';
        // } else {
        //     throw new BadRequestException('User Login or User Password are incorrect!');
        // }
    }

}
