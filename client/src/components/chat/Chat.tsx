import {useChatStore} from "../../store/chatStore";
import {MessageForm} from "./MessageForm.tsx";

interface ChatProps {
    userId: string;
    username: string;
}

export const Chat = ({userId, username}: ChatProps) => {
    const {currentChannel, messages, sendMessage} = useChatStore();

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
                                    <time className="text-xs opacity-50">{new Date(msg.createdAt).toLocaleTimeString()}</time>
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