import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const UserActivityComentsSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    fileName: String,
    likes: [String],
    timestamp: {
        type: Date,
        defauly: Date.now()
    }
});

export const UserActivitySchema = new mongoose.Schema({
    userId: String,
    userName: String,
    comment: String,
    timestamp: {
        type: Date,
        defauly: Date.now()
    },
    comments: [UserActivityComentsSchema],
})