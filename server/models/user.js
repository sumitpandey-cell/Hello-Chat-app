import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        default: 'https://res.cloudinary.com/djv9v8g6d/image/upload/v1633666113/blank-profile-picture-973460_640_1_zzv9xj.png'
    },
    lastMessage: {
        type: String,
        default: ''
    }
}, {timestamps: true});

const User = mongoose.model('user', userSchema);
export default User;