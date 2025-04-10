import {useChatStore} from "../../store/chatStore";
import {MessageForm} from "./MessageForm.tsx";
import {useEffect, useRef, useState} from "react";
import {formatMessageTime} from "../../utils/utils.ts";

interface ChatProps {
    userId: string;
    username: string;
}

export const Chat = ({userId, username}: ChatProps) => {
    const {currentChannel, messages, sendMessage} = useChatStore();
    const [currentTime, setCurrentTime] = useState(new Date());
    const messagesEndRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        scrollToBottom();
    }, [messages, currentChannel]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const channelMessages = currentChannel ? messages[currentChannel] || [] : [];

    const handleSendMessage = (content: string) => {
        sendMessage(content, userId, username);
    };

    if (!currentChannel) {
        return <div className="chat-container">Select a channel to start chatting</div>;
    }

    return (
        <div className="h-screen flex flex-col justify-end pb-3">
            <div className="overflow-y-scroll">
                {channelMessages.length === 0 ? (
                    <div className="no-messages">No messages yet</div>
                ) : (
                    <>
                        {channelMessages.map((msg) => (
                            <div key={msg._id}>
                                <div className={`chat m-2 ${msg.userId === userId ? "chat-end" : "chat-start"}`}>
                                    <div className="chat-header">
                                        {msg.username}
                                        <time className="text-xs opacity-50">{formatMessageTime(msg.createdAt, currentTime)}</time>
                                    </div>
                                    <div className="chat-bubble">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <MessageForm onSendMessage={handleSendMessage} />

        </div>
    );
};