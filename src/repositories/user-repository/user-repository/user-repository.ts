import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/domain/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User') private readonly userCollection: Model<User>) {

    }

    async getById(id: string): Promise<User> {
        return await this.userCollection
        .findOne({ _id:id })
        .lean();
    }

    async getUsers(): Promise<User[]> {
        return await this.userCollection
        .find()
        .lean();
    }

    async createUser(newUser: UserViewModel) {
        console.table(newUser);
        const user = this.userCollection(newUser);
        return await user.save();

    }
}