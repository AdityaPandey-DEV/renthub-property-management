import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { HiUserCircle } from 'react-icons/hi';

const ChatList = () => {
    const { chats, currentChat, setCurrentChat, loadMessages, loadingChats } = useChat();
    const { user } = useAuth();

    const handleChatSelect = (chat) => {
        setCurrentChat(chat);
        loadMessages(chat._id);
    };

    if (loadingChats) {
        return <div className="p-4 text-center text-gray-400">Loading chats...</div>;
    }

    if (chats.length === 0) {
        return <div className="p-4 text-center text-gray-400">No conversations yet.</div>;
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {chats.map((chat) => {
                    const otherParticipant = chat.participants.find(p => p._id !== user._id);
                    const isActive = currentChat?._id === chat._id;

                    return (
                        <div
                            key={chat._id}
                            onClick={() => handleChatSelect(chat)}
                            className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${isActive
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-r-4 border-indigo-500'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            <div className="relative">
                                {otherParticipant?.avatar ? (
                                    <img
                                        src={otherParticipant.avatar}
                                        alt={otherParticipant.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <HiUserCircle className="w-12 h-12 text-gray-400" />
                                )}
                                {/* Online status indicator (future enhancement) */}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-semibold truncate">{otherParticipant?.name}</h3>
                                    {chat.lastMessage && (
                                        <span className="text-xs text-gray-500">
                                            {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 truncate">
                                    {chat.lastMessage ? (
                                        chat.lastMessage.content || 'Image'
                                    ) : (
                                        <span className="italic">Start a conversation</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatList;
