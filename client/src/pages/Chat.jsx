import { useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const Chat = () => {
    const { fetchChats, currentChat } = useChat();

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div className="pt-16 h-screen bg-gray-50 dark:bg-slate-900 flex justify-center">
            <div className="container mx-auto p-4 h-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden h-[calc(100vh-6rem)] border border-gray-200 dark:border-slate-700 flex">
                    {/* Chat List Sidebar - Hidden on mobile when chat is open */}
                    <div className={`${currentChat ? 'hidden md:block' : 'w-full'} md:w-1/3 lg:w-1/4 h-full border-r border-gray-200 dark:border-slate-700`}>
                        <ChatList />
                    </div>

                    {/* Chat Window - Hidden on mobile when no chat selected */}
                    <div className={`${!currentChat ? 'hidden md:block' : 'w-full'} md:w-2/3 lg:w-3/4 h-full`}>
                        <ChatWindow />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
