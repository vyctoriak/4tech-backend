import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository/user-repository';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityRepository } from 'src/repositories/user-repository/user-activity-repository/user-activity-repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readFileSync } from 'fs';
import { LikeOrDislikeViewModel } from 'src/domain/schemas/like-or-dislike.viewmodel';
import { throws } from 'assert';
import { throwError } from 'rxjs';

@Injectable()
export class UserActivityService {
    constructor(private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository) {
    }

    async getRecentUploads(index: string) {
        const indexAsNumber = parseInt(index, 10);
        if(isNaN(indexAsNumber)) {
            throw new BadRequestException('Invalid Index');
        }
        const recentUploads = await this.userActivityRepository.getPaged(indexAsNumber); 

        return this.convertImagesToBase64(recentUploads);
    }

    async likeOrDislikeViewModel(likeOrDislikeViewModel: LikeOrDislikeViewModel) {
        
        const userActivity = await this.userActivityRepository.getById(likeOrDislikeViewModel.userActivityId);
        if(!userActivity) {
            throw new BadRequestException('An user Activity with the given id does not exist');
        }

        const user = await this.userRepository.getById(likeOrDislikeViewModel.userId);
        if(!user) {
            throw new BadRequestException('An user with the given id does not exist');
        }
        // console.log(userActivity);

        if(userActivity.likes.includes(user._id.toString())) {
            userActivity.likes = userActivity.likes.filter( x => x !== user._id);
        } else {
            userActivity.likes.push(user._id.toString());
        }

        return await this.userActivityRepository.update(userActivity);

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

        const createdUserActivity = await this.userActivityRepository.create(uploadImageObg);
        return await this.convertImageToBase64ForOneFile(createdUserActivity);
    }

    convertImagesToBase64(userActivities: UserActivity[]) {
        return Promise.all(
            userActivities.map(userActivity => {
                return {
                    ...userActivity,
                    imgEncoded: readFileSync('../images/' + userActivity.fileName, 'base64'),
                };
            }),
        );
    }

    convertImageToBase64ForOneFile(userActivity: UserActivity) {
        return {
            ...userActivity,
            imgEncode: readFileSync('../images/' + userActivity.fileName, 'base64')
        };
    }
}

    

