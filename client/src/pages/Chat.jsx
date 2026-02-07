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
        <div className="pt-16 h-screen bg-[var(--wa-bg-app)] flex justify-center items-center min-h-[600px]">
            {/* Green background strip for desktop (WhatsApp Web style) */}
            <div className="hidden md:block fixed top-0 left-0 w-full h-32 bg-[var(--wa-teal)] z-0"></div>

            <div className="container mx-auto p-0 md:p-4 h-full relative z-10 max-w-[1600px]">
                <div className="bg-[var(--wa-bg-app)] md:shadow-lg rounded-none md:rounded-xl overflow-hidden h-full border-0 flex">
                    {/* Chat List Sidebar - Hidden on mobile when chat is open */}
                    <div className={`${currentChat ? 'hidden md:flex' : 'flex'} w-full md:w-[30%] lg:w-[30%] flex-col h-full border-r border-[var(--wa-header-primary)]/10 bg-[var(--wa-bg-header)]`}>
                        <ChatList />
                    </div>

                    {/* Chat Window - Hidden on mobile when no chat selected */}
                    <div className={`${!currentChat ? 'hidden md:flex' : 'flex'} w-full md:w-[70%] lg:w-[70%] flex-col h-full bg-[var(--wa-bg-chat)] relative`}>
                        <ChatWindow />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
