import { create } from "zustand";
import { useSocketStore } from "../socket/socket";

interface Message {
    _id?: string;
    channelId: string;
    userId: string;
    username: string;
    content: string;
    createdAt: Date;
}

interface Channel {
    _id?: string;
    name: string;
    createdAt: Date;
}

interface ChatStore {
    channels: Channel[];
    currentChannel: string | null;
    messages: Record<string, Message[]>;
    setChannels: (channels: Channel[]) => void;
    joinChannel: (channelId: string) => void;
    sendMessage: (content: string, userId: string, username: string) => void;
    addMessage: (message: Message) => void;
    setMessages: (channelId: string, messages: Message[]) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    channels: [],
    currentChannel: null,
    messages: {},

    setChannels: (channels) => set({ channels }),

    joinChannel: (channelId) => {
        const { socket } = useSocketStore.getState();
        if (socket) {
            // Leave current channel if any
            const currentChannel = get().currentChannel;
            if (currentChannel) {
                socket.emit("leaveChannel", currentChannel);
            }

            // Join new channel
            socket.emit("joinChannel", channelId);
            socket.emit("getMessages", channelId);
            set({ currentChannel: channelId });
        }
    },

    sendMessage: (content, userId, username) => {
        const { socket } = useSocketStore.getState();
        const channelId = get().currentChannel;

        if (socket && channelId) {
            socket.emit("sendMessage", {
                channelId,
                userId,
                username,
                content
            });
        }
    },

    addMessage: (message) => {
        set((state) => {
            const channelMessages = state.messages[message.channelId] || [];
            return {
                messages: {
                    ...state.messages,
                    [message.channelId]: [...channelMessages, message]
                }
            };
        });
    },

    setMessages: (channelId, messages) => {
        set((state) => ({
            messages: {
                ...state.messages,
                [channelId]: messages
            }
        }));
    }
}));