import { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { HiPaperAirplane, HiUserCircle, HiArrowLeft } from 'react-icons/hi';

const ChatWindow = () => {
    const { currentChat, messages, sendMessage, loadingMessages, setCurrentChat } = useChat();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const otherParticipant = currentChat?.participants.find(p => p._id !== user._id);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        sendMessage(currentChat._id, newMessage);
        setNewMessage('');
    };

    if (!currentChat) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900 text-gray-400">
                <div className="text-center">
                    <HiUserCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select a chat to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-slate-900">
            {/* Header */}
            <div className="p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center gap-3 shadow-sm z-10">
                <button
                    onClick={() => setCurrentChat(null)}
                    className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
                >
                    <HiArrowLeft className="text-xl" />
                </button>
                {otherParticipant?.avatar ? (
                    <img
                        src={otherParticipant.avatar}
                        alt={otherParticipant.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <HiUserCircle className="w-10 h-10 text-gray-400" />
                )}
                <div>
                    <h3 className="font-semibold">{otherParticipant?.name}</h3>
                    <p className="text-xs text-green-500">Online</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingMessages ? (
                    <div className="text-center text-gray-400 mt-10">Loading messages...</div>
                ) : (
                    messages.map((msg, index) => {
                        const isMe = msg.sender._id === user._id || msg.sender === user._id;
                        return (
                            <div
                                key={msg._id || index}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${isMe
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-slate-700'
                                        }`}
                                >
                                    <p>{msg.content}</p>
                                    <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-indigo-200' : 'text-gray-400'}`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/30"
                    >
                        <HiPaperAirplane className="rotate-90 text-xl" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
