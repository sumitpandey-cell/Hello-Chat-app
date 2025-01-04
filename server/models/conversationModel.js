import mongoose from 'mongoose';

import messageModel from './messageModel.js';


const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: messageModel
        }
    ]
}, {timestamps: true});

const Conversation = mongoose.model('conversation', conversationSchema);
export{
    Conversation
}