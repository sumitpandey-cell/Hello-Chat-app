//create message model
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ''
    },
    imageUrl: {
        type: String,
        default: ''
    },
    videoUrl: {
        type: String,
        default: ''
    },
    seen: {
        type: Boolean,
        default: false
    },
    senderId: {  // New field added
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true});

const messageModel = mongoose.model('message', messageSchema);

export default messageModel;
