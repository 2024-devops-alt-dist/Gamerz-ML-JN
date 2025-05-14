import React, { useState } from "react";

interface MessageFormProps {
    onSendMessage: (content: string) => void;
    replyTo: any | null;
    onCancelReply: () => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({
                                                            onSendMessage,
                                                            replyTo,
                                                            onCancelReply
                                                        }) => {
    const [messageText, setMessageText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        onSendMessage(messageText);
        setMessageText("");
    };

    return (
        <div className="px-2">
            {replyTo && (
                <div className="bg-base-200 p-2 mb-2 rounded-md flex justify-between items-start">
                    <div>
                        <div className="font-semibold text-sm">Replying to {replyTo.username}</div>
                        <div className="text-sm truncate">{replyTo.content}</div>
                    </div>
                    <button
                        onClick={onCancelReply}
                        className="text-sm hover:text-error"
                    >
                        ✕
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={replyTo ? "Type your reply..." : "Type your message..."}
                    className="input w-full focus:outline-none focus:ring-0 px-2"
                    style={{
                        "--input-color": "color-mix(in oklab, var(--color-base-content) 20%, #0000)",
                        ":focus": {
                            "borderColor": "var(--input-color)"
                        }
                    } as React.CSSProperties}
                />
            </form>
        </div>
    );
};