import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import axios from 'axios'; // We'll use a direct axios instance or the one from api/axios

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();
    const [socket, setSocket] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingChats, setLoadingChats] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    // Use the configured API URL
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const SOCKET_URL = API_URL.replace('/api', ''); // Base URL for socket

    // Initialize Socket
    useEffect(() => {
        if (isAuthenticated && user) {
            const newSocket = io(SOCKET_URL, {
                withCredentials: true,
                query: { userId: user._id }
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
            });

            newSocket.on('receive_message', (message) => {
                // If message belongs to current chat, append it
                if (currentChat && (message.chat === currentChat._id || message.chat._id === currentChat._id)) {
                    setMessages((prev) => [...prev, message]);
                } else {
                    // Update last message in chat list or show notification
                    updateChatLastMessage(message);
                }
            });

            setSocket(newSocket);

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [isAuthenticated, user]);

    // Fetch User Chats
    const fetchChats = async () => {
        if (!isAuthenticated) return;
        setLoadingChats(true);
        try {
            const res = await axios.get(`${API_URL}/chats`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.data.success) {
                setChats(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        } finally {
            setLoadingChats(false);
        }
    };

    // Load Messages for a Chat
    const loadMessages = async (chatId) => {
        setLoadingMessages(true);
        try {
            const res = await axios.get(`${API_URL}/chats/${chatId}/messages`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (res.data.success) {
                setMessages(res.data.data);
                // Also join the socket room
                if (socket) {
                    socket.emit('join_chat', chatId);
                }
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoadingMessages(false);
        }
    };

    // Send Message
    const sendMessage = async (chatId, content) => {
        try {
            const res = await axios.post(`${API_URL}/chats/${chatId}/messages`, { content }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (res.data.success) {
                const newMessage = res.data.data;
                setMessages((prev) => [...prev, newMessage]);

                // Emit via socket (optional if backend broadcasts to sender too, but backend usually broadcasts to others)
                // If backend only broadcasts to others, we manually update state (which we just did)
                if (socket) {
                    socket.emit('send_message', newMessage);
                }

                updateChatLastMessage(newMessage);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Create or Open Chat
    const openChat = async (participantId) => {
        try {
            const res = await axios.post(`${API_URL}/chats`, { participantId }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (res.data.success) {
                const chat = res.data.data;
                // Check if already in list
                if (!chats.find(c => c._id === chat._id)) {
                    setChats(prev => [chat, ...prev]);
                }
                setCurrentChat(chat);
                loadMessages(chat._id);
                return chat;
            }
        } catch (error) {
            console.error('Error opening chat:', error);
        }
    };

    const updateChatLastMessage = (message) => {
        const chatId = typeof message.chat === 'object' ? message.chat._id : message.chat;

        setChats(prevChats => {
            const updatedChats = prevChats.map(chat => {
                if (chat._id === chatId) {
                    return { ...chat, lastMessage: message, updatedAt: new Date().toISOString() };
                }
                return chat;
            });
            // Move updated chat to top
            return updatedChats.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        });
    };

    return (
        <ChatContext.Provider value={{
            socket,
            chats,
            currentChat,
            messages,
            loadingChats,
            loadingMessages,
            fetchChats,
            setCurrentChat,
            loadMessages,
            sendMessage,
            openChat
        }}>
            {children}
        </ChatContext.Provider>
    );
};
