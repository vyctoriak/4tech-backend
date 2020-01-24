import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userLogin: String, 
    userName: String,
    passoword: String
})