import React, { useState } from "react";

interface MessageFormProps {
    onSendMessage: (content: string) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
    const [messageText, setMessageText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        onSendMessage(messageText);
        setMessageText("");
    };

    return (
        <form onSubmit={handleSubmit} className="message-form">
            <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};