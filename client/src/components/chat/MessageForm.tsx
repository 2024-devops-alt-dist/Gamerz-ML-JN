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
        <form onSubmit={handleSubmit} className="px-2">
            <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="input w-full focus:outline-none focus:ring-0 px-2"
                style={{
                    "--input-color": "color-mix(in oklab, var(--color-base-content) 20%, #0000)",
                    ":focus": {
                        "borderColor": "var(--input-color)"
                    }
                } as React.CSSProperties}
            />
        </form>
    );
};