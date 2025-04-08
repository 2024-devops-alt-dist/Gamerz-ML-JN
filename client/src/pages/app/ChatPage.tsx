// src/pages/ChatPage.tsx
import { useEffect } from "react";
import { ChannelList } from "../../components/channel/ChannelList";
import { Chat } from "../../components/chat/Chat";
import { SocketEventHandler } from "../../components/socket/SocketEventHandler";
import { useSocketStore } from "../../socket/socket";
import {useAuth} from "../../context/AuthContext.tsx";

export const ChatPage = () => {
    const { connect, disconnect } = useSocketStore();
    const { user } = useAuth();

    useEffect(() => {
        connect();
        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    if (!user) {
        console.log(user)
        return <div>Please log in to access the chat</div>;
    }

    return (
        <div className="chat-page">
            <SocketEventHandler />
            <div className="chat-layout">
                <aside className="sidebar">
                    <ChannelList />
                </aside>
                <main className="main-content">
                    <Chat userId={user.userId} username={user.username} />
                </main>
            </div>
        </div>
    );
};