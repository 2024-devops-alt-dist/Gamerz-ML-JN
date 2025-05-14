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
                        <div
                            key={msg._id}
                            onContextMenu={(e) => handleContextMenu(e, msg as Message)}
                            className={`flex flex-col px-4 py-2 gap-1 ${msg.userId === userId ? "items-end" : "items-start"}`}
                        >
                            {msg.replyTo && (
                            <div className={`relative flex items-start w-full max-w-md ${msg.userId === userId ? "flex-row-reverse" : ""}`}>
                                <div className={`
                                    h-4 mt-6 text-transparent border-gray-300 border-t rounded-b-none rounded 
                                    ${msg.userId === userId
                                    ? "border-r rounded-l-none mr-5"
                                    : "border-l rounded-r-none ml-5"}
                                `}>
                                    ---
                                </div>

                                <div className={`flex flex-col bg-base-200 rounded-lg px-3 py-1 text-sm shadow-sm max-w-[80%] 
                                ${msg.userId === userId ? "items-end mr-2" : "items-start ml-2"}`}>
                                    <span className="font-semibold text-xs text-primary">
                                        {msg.replyTo.username}
                                    </span>
                                    <span className="text-xs italic text-neutral-content">
                                        {msg.replyTo.content}
                                    </span>
                                </div>
                            </div>
                            )}

                            <div className={`chat ${msg.userId === userId ? "chat-end" : "chat-start"} w-full max-w-md`}>
                            <div className="chat-header text-sm font-semibold">
                                {msg.username}
                                <time className="ml-2 text-xs opacity-50">
                                {formatMessageTime(msg.createdAt, currentTime)}
                                </time>
                            </div>
                            <div className={`chat-bubble px-4 py-2 break-words ${msg.userId === userId ? "bg-primary text-white" : "bg-secondary/40 text-white"}`}>
                                {msg.content}
                            </div>
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