const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Create or get existing chat
exports.createChat = async (req, res) => {
    try {
        const { participantId } = req.body;
        const currentUserId = req.user.id;

        // Check if chat already exists
        let chat = await Chat.findOne({
            participants: { $all: [currentUserId, participantId] }
        });

        if (chat) {
            return res.status(200).json({ success: true, data: chat });
        }

        // Create new chat
        chat = await Chat.create({
            participants: [currentUserId, participantId],
            unreadCounts: {
                [currentUserId]: 0,
                [participantId]: 0
            }
        });

        const fullChat = await Chat.findById(chat._id).populate('participants', 'name email avatar');

        res.status(201).json({
            success: true,
            data: fullChat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating chat',
            error: error.message
        });
    }
};

// Get all chats for a user
exports.getUserChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            participants: { $in: [req.user.id] }
        })
            .populate('participants', 'name email avatar')
            .populate('lastMessage')
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            data: chats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching chats',
            error: error.message
        });
    }
};

// Get messages for a specific chat
exports.getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'name email avatar')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching messages',
            error: error.message
        });
    }
};

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { content } = req.body;
        const senderId = req.user.id;

        // Create message
        const message = await Message.create({
            chat: chatId,
            sender: senderId,
            content
        });

        // Update chat's last message
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { lastMessage: message._id },
            { new: true }
        ).populate('participants');

        // Identify recipient
        const recipient = chat.participants.find(p => p._id.toString() !== senderId);

        if (recipient) {
            // Create notification for recipient
            await Notification.create({
                user: recipient._id,
                title: 'New Message',
                message: `You have a new message from ${req.user.name}`,
                type: 'chat',
                relatedId: chatId
            });

            // Emit notification via socket if user is online (optional, handled by socket logic usually)
            // const io = req.app.get('io');
            // if (io) {
            //     io.to(recipient._id.toString()).emit('new_notification');
            // }
        }

        const fullMessage = await Message.findById(message._id)
            .populate('sender', 'name email avatar')
            .populate('chat');

        res.status(201).json({
            success: true,
            data: fullMessage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
};
