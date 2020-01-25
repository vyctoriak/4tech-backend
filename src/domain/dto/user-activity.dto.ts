import { UserActivityCommentDto } from './user-activity-comment.dto';

export class UserActiviyDto {
    constructor(userId: string, fileName: string, userName: string) {
        this.userId = userId;
        this.userName = userName;
        this.fileName = fileName;
        this.timestamp = new Date();
        this.likes = [];
        this.comments = [];
    }

    readonly userId: string;
    readonly fileName: string;
    readonly userName: string; 
    readonly timestamp: Date;
    readonly likes: string[];
    readonly comments: UserActivityCommentDto[];
}