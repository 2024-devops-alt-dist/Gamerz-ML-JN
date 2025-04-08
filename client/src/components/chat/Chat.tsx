// src/components/Chat.tsx
import { useState } from "react";
import { useChatStore } from "../../store/chatStore";

interface ChatProps {
    userId: string;
    username: string;
}

export const Chat = ({ userId, username }: ChatProps) => {
    const { currentChannel, messages, sendMessage } = useChatStore();
    const [messageText, setMessageText] = useState("");

    const channelMessages = currentChannel ? messages[currentChannel] || [] : [];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        sendMessage(messageText, userId, username);
        setMessageText("");
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
                        <div key={msg._id} className={`message ${msg.userId === userId ? "own" : ""}`}>
                            <span className="username accent-red-100 w-10">{msg.username}</span>
                            <p className="content">{msg.content}</p>
                            <span className="timestamp">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSendMessage} className="message-form">
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};