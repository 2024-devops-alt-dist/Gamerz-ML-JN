import { useChatStore } from "../../store/chatStore";
import { MessageForm } from "./MessageForm";
import { useEffect, useRef, useState } from "react";
import { formatMessageTime } from "../../utils/utils";

interface ChatProps {
    userId: string;
    username: string;
}

interface Message {
    _id?: string;
    userId: string;
    username: string;
    content: string;
    createdAt: Date;
    replyTo?: {
        _id?: string;
        userId: string;
        username: string;
        content: string;
    } | null;
}

export const Chat = ({ userId, username }: ChatProps) => {
    const { currentChannel, messages, sendMessage } = useChatStore();
    const [currentTime, setCurrentTime] = useState(new Date());
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [replyTo, setReplyTo] = useState<Message | null>(null);
    const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number; message: Message | null }>({
        visible: false,
        x: 0,
        y: 0,
        message: null
    });

    const handleContextMenu = (e: React.MouseEvent, message: Message) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            message
        });
    };

    useEffect(() => {
        const handleClick = () => {
            setContextMenu({ visible: false, x: 0, y: 0, message: null });
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

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
        if (currentChannel) {
            sendMessage(content, userId, username, replyTo ? { ...replyTo, channelId: currentChannel } : null);
        }
        setReplyTo(null);
    };

    const cancelReply = () => {
        setReplyTo(null);
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
                            <div key={msg._id} onContextMenu={(e) => handleContextMenu(e, msg as Message)}>
                                <div className={`chat m-2 ${msg.userId === userId ? "chat-end" : "chat-start"}`}>
                                    <div className="chat-header">
                                        {msg.username}
                                        <time className="text-xs opacity-50">{formatMessageTime(msg.createdAt, currentTime)}</time>
                                    </div>
                                    {msg.replyTo && (
                                        <div className="chat-bubble chat-bubble-reply bg-opacity-50 text-sm mb-1">
                                            <div className="font-semibold">{msg.replyTo.username}</div>
                                            <div>{msg.replyTo.content}</div>
                                        </div>
                                    )}
                                    <div className="chat-bubble">{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <MessageForm onSendMessage={handleSendMessage} replyTo={replyTo} onCancelReply={cancelReply} />
            {contextMenu.visible && (
                <div
                    className="absolute bg-base-200 shadow-lg rounded-md p-1 z-50"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <button
                        className="w-full text-left px-3 py-1 hover:bg-base-300 rounded"
                        onClick={() => {
                            setReplyTo(contextMenu.message);
                            setContextMenu({ visible: false, x: 0, y: 0, message: null });
                        }}
                    >
                        Reply
                    </button>
                </div>
            )}
        </div>
    );
};