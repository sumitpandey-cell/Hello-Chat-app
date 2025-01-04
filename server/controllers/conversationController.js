import { Conversation } from '../models/conversationModel.js';
import messageModel from '../models/messageModel.js';

export const getConversation = async (req, res) => {
  try {
    const { userId, receiverId } = req.body;
    console.log(userId, receiverId);
    let conversation = await Conversation.findOne({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId }
      ]
    }).populate('message');

    if (!conversation) {
      conversation = new Conversation({
        sender: userId,
        receiver: receiverId,
        message: []
      });
      await conversation.save();
    }
    
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
};

//Get senderId and receiverId and text and save it to the database
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
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

    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

//Get userId as params and get all received messages and receiver details
export const getAllReceivedMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({
      $or: [{ sender: userId }, { receiver: userId }]
    }).populate('sender receiver', 'username profileUrl')
      .populate({
        path: 'message',
        options: { sort: { 'createdAt': -1 }, limit: 1 }
      });
      console.log("asdasdasd",conversations);

    // Format the response
    const formattedConversations = conversations.map(conv => {
      const otherUser = conv.sender._id.toString() === userId ? conv.receiver : conv.sender;
      return {
        conversationId: conv._id,
        userId: otherUser._id,
        username: otherUser.username,
        profileUrl: otherUser.profileUrl,
        lastMessage: conv.message && conv.message.length > 0 ? conv.message[0].text : null,
        lastMessageTime: conv.message && conv.message.length > 0 ? conv.message[0].createdAt : null
      };
    });

    res.json(formattedConversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ message: 'Error fetching conversations', error: error.message });
  }
};