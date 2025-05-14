// src/components/SocketEventHandler.tsx
import { useEffect } from "react";
import { useSocketStore } from "../../socket/socket";
import { useChatStore } from "../../store/chatStore";

export const SocketEventHandler = () => {
    const { socket } = useSocketStore();
    const { addMessage, setMessages } = useChatStore();

    useEffect(() => {
        if (!socket) return;

        // Listen for new messages
        socket.on("newMessage", (message) => {
            addMessage(message);
        });

        // Listen for message history
        socket.on("messageHistory", (messages) => {
            if (messages.length > 0) {
                setMessages(messages[0].channelId, messages);
            }
        });

        // Error handling
        socket.on("error", (error) => {
            console.error("Socket error:", error);
        });

        return () => {
            socket.off("newMessage");
            socket.off("messageHistory");
            socket.off("error");
        };
    }, [socket, addMessage, setMessages]);

    return null;
};