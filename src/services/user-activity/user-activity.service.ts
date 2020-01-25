import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository/user-repository';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityRepository } from 'src/repositories/user-repository/user-activity-repository/user-activity-repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readFileSync } from 'fs';

@Injectable()
export class UserActivityService {
    constructor(private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository) {
    }

    getRecentUploads(index: string) {
        const indexAsNumber = parseInt(index, 10);
        if(isNaN(indexAsNumber)) {
            throw new BadRequestException('Invalid Index');
        }

        return this.userActivityRepository.getPaged(indexAsNumber);
    }

    async uploadImage(userId: string, filename: string, description: string) {

        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new BadRequestException('This user does not exist');
        }

        const uploadImageObg = new UserActivityDto(userId, filename, user.userName);
        if (description) {
            uploadImageObg.comments.push(new UserActivityCommentDto(
                userId,
                user.userName,
                description
            ));
        }

        return await this.userActivityRepository.create(uploadImageObg);
    }

    convertImagesToBase64(userActivities: UserActivity[]) {
        return Promise.all(
            userActivities.map(userActivity => {
                return {
                    ...userActivity,
                    imgEncoded: readFileSync('../images/' + userActivity.filename, 'base64'),
                };
            }),
        );
    }
}
