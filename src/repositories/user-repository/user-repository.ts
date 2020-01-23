import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';

@Injectable()
export class UserRepository {
    db: UserViewModel[] = [
        new UserViewModel('vyctoria.k', 'vyctoria', '123'),
    ];

    getUsers() {
        return this.db;
    }

    createUser(newUser: UserViewModel) {
        this.db.push(newUser);
        return 'User successfully added';
    }
}
