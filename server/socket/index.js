import express from 'express';
import { Server } from "socket.io";
import http from 'http';
import currentUser from '../helpers/currentUser.js';
import User from '../models/user.js';
import { Conversation } from '../models/conversationModel.js';
import messageModel from '../models/messageModel.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const onlineUsers = new Set();

io.on('connection', async (socket) => {
    console.log('user connected', socket.id);
    const token = socket.handshake.auth.token;
    const user = await currentUser(token);

    if (user) {
        socket.join(user._id.toString());
        onlineUsers.add(user._id.toString());
        io.emit('onlineUsers', Array.from(onlineUsers));

        socket.on('getConversation', async ({ userId, receiverId }) => {
            try {
                let conversation = await Conversation.findOne({
                    $or: [
                        { sender: userId, receiver: receiverId },
                        { sender: receiverId, receiver: userId }
                    ]
                }).populate({
                    path: 'message',
                    select: 'text sender createdAt'
                });

                if (!conversation) {
                    conversation = new Conversation({
                        sender: userId,
                        receiver: receiverId,
                        message: []
                    });
                    await conversation.save();
                }

                socket.emit('conversation', conversation);
            } catch (error) {
                console.error('Error fetching conversation:', error);
            }
        });

        socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
            try {
                const newMessage = new messageModel({ text, senderId, receiverId }); // Add senderId and receiverId
                await newMessage.save();

                let conversation = await Conversation.findOne({
                    $or: [
                        { sender: senderId, receiver: receiverId },
                        { sender: receiverId, receiver: senderId }
                    ]
                });

                if (!conversation) {
                    conversation = new Conversation({
                        sender: senderId,
                        receiver: receiverId,
                        message: []
                    });
                }

                conversation.message.push(newMessage._id);
                await conversation.save();

                // Emit the new message to both sender and receiver
                io.to(senderId).to(receiverId).emit('newMessage', {
                    conversationId: conversation._id,
                    message: newMessage
                });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        socket.on('disconnect', () => {
            onlineUsers.delete(user._id.toString());
            io.emit('onlineUsers', Array.from(onlineUsers));
        });
    }
});

export { app, server };
