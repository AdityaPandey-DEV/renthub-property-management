import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { HiUserCircle, HiChat, HiDotsVertical } from 'react-icons/hi';
import { format } from 'date-fns';

const ChatList = () => {
    const { chats, currentChat, setCurrentChat, loadingChats, fetchChats } = useChat();
    const { user } = useAuth();

    useEffect(() => {
        fetchChats();
    }, []);

    const getOtherParticipant = (chat) => {
        return chat.participants.find(p => p._id !== user._id);
    };

    return (
        <div className="flex flex-col h-full bg-[var(--wa-bg-header)]">
            {/* WhatsApp Sidebar Header */}
            <div className="h-16 px-4 py-2 bg-[var(--wa-bg-header)] flex items-center justify-between border-b border-[var(--wa-header-primary)]/10">
                <div className="flex items-center gap-3">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-white text-xl">
                            <HiUserCircle />
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-4 text-[var(--wa-text-secondary)]">
                    <button title="New Chat" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <HiChat className="text-xl" />
                    </button>
                    <button title="Menu" className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
                        <HiDotsVertical className="text-xl" />
                    </button>
                </div>
            </div>

            {/* Search Bar (Visual only for now) */}
            <div className="p-2 border-b border-[var(--wa-header-primary)]/10">
                <div className="bg-[var(--wa-bg-app)] dark:bg-[var(--wa-bg-app)] rounded-lg px-4 py-1.5 flex items-center">
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        className="w-full bg-transparent border-none focus:ring-0 text-[var(--wa-text-primary)] text-sm placeholder-[var(--wa-text-secondary)]"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto bg-[var(--wa-bg-header)]">
                {loadingChats ? (
                    <div className="flex justify-center p-8">
                        <div className="w-8 h-8 border-4 border-[var(--wa-teal)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : chats.length === 0 ? (
                    <div className="text-center p-8 text-[var(--wa-text-secondary)]">
                        <p>No chats yet</p>
                    </div>
                ) : (
                    chats.map(chat => {
                        const otherParticipant = getOtherParticipant(chat);
                        const isSelected = currentChat?._id === chat._id;

                        return (
                            <div
                                key={chat._id}
                                onClick={() => setCurrentChat(chat)}
                                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors border-b border-[var(--wa-header-primary)]/10 hover:bg-[var(--bg-secondary)] ${isSelected
                                        ? 'bg-[var(--bg-secondary)]'
                                        : 'bg-[var(--wa-bg-header)]'
                                    }`}
                            >
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    {otherParticipant?.avatar ? (
                                        <img
                                            src={otherParticipant.avatar}
                                            alt={otherParticipant.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-gray-400 text-2xl">
                                            <HiUserCircle />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-medium text-[var(--wa-text-primary)] truncate text-base">
                                            {otherParticipant?.name || 'Unknown User'}
                                        </h3>
                                        {chat.lastMessage && (
                                            <span className={`text-xs ${chat.unreadCount > 0 ? 'text-[var(--wa-teal)] font-medium' : 'text-[var(--wa-text-secondary)]'
                                                }`}>
                                                {format(new Date(chat.lastMessage.createdAt), 'HH:mm')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-[var(--wa-text-secondary)] truncate pr-2">
                                            {chat.lastMessage ? chat.lastMessage.content : 'Start a conversation'}
                                        </p>
                                        {chat.unreadCount > 0 && (
                                            <span className="bg-[var(--wa-teal)] text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                                                {chat.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ChatList;
