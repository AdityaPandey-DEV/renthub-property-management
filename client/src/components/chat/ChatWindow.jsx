import { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { HiPaperAirplane, HiUserCircle, HiArrowLeft, HiDotsVertical, HiSearch, HiEmojiHappy, HiPaperClip, HiMicrophone } from 'react-icons/hi';
import { BsCheck, BsCheckAll } from 'react-icons/bs';
import { format } from 'date-fns';

const ChatWindow = () => {
    const { currentChat, messages, sendMessage, loadingMessages, setCurrentChat } = useChat();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (newMessage.trim() && currentChat) {
            sendMessage(currentChat._id || currentChat, newMessage);
            setNewMessage('');
        }
    };

    if (!currentChat) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-[var(--wa-bg-app)] border-b-[6px] border-[var(--wa-teal)] box-border">
                <div className="text-center max-w-md p-8">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png"
                        alt="WhatsApp"
                        className="w-24 h-24 mx-auto mb-8 opacity-20 grayscale"
                    />
                    <h2 className="text-3xl font-light text-[var(--wa-text-primary)] mb-4">RentHub Web</h2>
                    <p className="text-[var(--wa-text-secondary)]">
                        Send and receive messages without keeping your phone online.
                        <br />
                        Use RentHub on up to 4 linked devices and 1 phone.
                    </p>
                </div>
            </div>
        );
    }

    const otherParticipant = currentChat.participants.find(p => p._id !== user._id);

    return (
        <div className="flex flex-col h-full bg-[var(--wa-bg-chat)] relative overflow-hidden">
            {/* Doodle Background */}
            <div className="absolute inset-0 wa-doodle-bg z-0 pointer-events-none"></div>

            {/* Header */}
            <div className="px-4 py-2.5 bg-[var(--wa-bg-header)] flex items-center justify-between border-l border-[var(--wa-header-primary)]/10 z-10 relative">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentChat(null)}
                        className="md:hidden p-2 -ml-2 text-[var(--wa-text-secondary)] hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
                    >
                        <HiArrowLeft className="text-xl" />
                    </button>
                    <div className="cursor-pointer">
                        {otherParticipant?.avatar ? (
                            <img
                                src={otherParticipant.avatar}
                                alt={otherParticipant.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-white text-xl">
                                <HiUserCircle />
                            </div>
                        )}
                    </div>
                    <div className="cursor-pointer">
                        <h3 className="font-medium text-[var(--wa-text-primary)] leading-tight">
                            {otherParticipant?.name || 'Unknown User'}
                        </h3>
                        <p className="text-xs text-[var(--wa-text-secondary)] truncate">
                            click here for contact info
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[var(--wa-text-secondary)]">
                    <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <HiSearch className="text-xl" />
                    </button>
                    <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <HiDotsVertical className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:px-[5%] space-y-2 z-10 relative custom-scrollbar">
                {loadingMessages ? (
                    <div className="flex justify-center py-4">
                        <div className="w-8 h-8 border-4 border-[var(--wa-teal)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    messages.map((message, index) => {
                        const isMe = message.sender._id === user._id || message.sender === user._id;
                        return (
                            <div
                                key={message._id || index}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'} group mb-1`}
                            >
                                <div
                                    className={`relative max-w-[85%] md:max-w-[65%] px-2 py-1.5 rounded-lg shadow-sm text-sm ${isMe
                                            ? 'bg-[var(--wa-bg-message-out)] text-gray-900 dark:text-gray-900 rounded-tr-none'
                                            : 'bg-[var(--wa-bg-message-in)] text-gray-900 dark:text-gray-100 rounded-tl-none'
                                        }`}
                                >
                                    {/* Tail */}
                                    <div className={isMe ? 'wa-tail-out' : 'wa-tail-in'}></div>

                                    {/* Sender Name (Group Chat feature, visible if not me) */}
                                    {!isMe && (
                                        <p className="text-xs font-bold text-[var(--wa-teal)] mb-0.5 px-1">
                                            {message.sender.name}
                                        </p>
                                    )}

                                    <div className="px-1 pb-1 relative min-w-[80px]">
                                        <span className="whitespace-pre-wrap leading-relaxed block break-words text-[14.2px]">
                                            {message.content}
                                        </span>
                                        {/* Metadata (Time & Check) */}
                                        <div className="float-right flex items-center gap-1 ml-2 mt-1 -mb-1 select-none">
                                            <span className="text-[11px] text-[var(--wa-text-secondary)]">
                                                {format(new Date(message.createdAt), 'HH:mm')}
                                            </span>
                                            {isMe && (
                                                <span className={`text-base ${true ? 'text-[var(--wa-check-blue)]' : 'text-[var(--wa-text-secondary)]'}`}>
                                                    <BsCheckAll />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="px-4 py-2 bg-[var(--wa-bg-header)] flex items-center gap-2 z-10 relative">
                <div className="flex gap-2 text-[var(--wa-text-secondary)]">
                    <button type="button" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <HiEmojiHappy className="text-2xl" />
                    </button>
                    <button type="button" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <HiPaperClip className="text-2xl" />
                    </button>
                </div>

                <div className="flex-1 bg-[var(--wa-bg-app)] dark:bg-[var(--wa-bg-header)] rounded-lg flex items-center px-4 py-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-[var(--wa-text-primary)] placeholder-[var(--wa-text-secondary)] text-[15px] p-1"
                    />
                </div>

                {newMessage.trim() ? (
                    <button
                        type="submit"
                        className="p-3 text-[var(--wa-text-secondary)] hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <HiPaperAirplane className="text-2xl rotate-90 text-[var(--wa-teal)]" />
                    </button>
                ) : (
                    <button
                        type="button"
                        className="p-3 text-[var(--wa-text-secondary)] hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <HiMicrophone className="text-2xl" />
                    </button>
                )}
            </form>
        </div>
    );
};

export default ChatWindow;
