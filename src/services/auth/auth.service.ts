import { Injectable, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { UserService } from '../user/user.service';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private JwtService: JwtService) {
    }

    async login(login: LoginViewModel) {
        const user = await this.userService.attemptLogin(login);

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
