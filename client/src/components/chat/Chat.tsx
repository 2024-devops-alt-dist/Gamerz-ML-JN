import {useChatStore} from "../../store/chatStore";
import {MessageForm} from "./MessageForm.tsx";
import {useEffect, useState} from "react";

interface ChatProps {
    userId: string;
    username: string;
}

export const Chat = ({userId, username}: ChatProps) => {
    const {currentChannel, messages, sendMessage} = useChatStore();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    const formatMessageTime = (createdAt: string | number | Date) => {
        const messageDate = new Date(createdAt);
        const diffInMinutes = Math.floor((currentTime.getTime() - messageDate.getTime()) / (1000 * 60));

        if(diffInMinutes < 1) {
            return 'now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} min ago`;
        } else if (diffInMinutes < 24 * 60) {
            const hours = Math.floor(diffInMinutes / 60);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return messageDate.toLocaleString();
        }
    };

    const channelMessages = currentChannel ? messages[currentChannel] || [] : [];

    const handleSendMessage = (content: string) => {
        sendMessage(content, userId, username);
    };

    if (!currentChannel) {
        return <div className="chat-container">Select a channel to start chatting</div>;
    }

    return (
        <div className="chat-container">
            <div className="messages-container">
                {channelMessages.length === 0 ? (
                    <div className="no-messages">No messages yet</div>
                ) : (
                    channelMessages.map((msg) => (
                        <div key={msg._id}>
                            <div className={`chat ${msg.userId === userId ? "chat-end" : "chat-start"}`}>
                                <div className="chat-header">
                                    {msg.username}
                                    <time className="text-xs opacity-50">{formatMessageTime(msg.createdAt)}</time>
                                </div>
                                <div className="chat-bubble">{msg.content}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <MessageForm onSendMessage={handleSendMessage} />

        </div>
    );
};