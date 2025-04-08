import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStore {
    socket: Socket | null;
    connect: () => void;
    disconnect: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,
    connect: () => {
        const socket = io("http://localhost:3000");
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });
        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });
        set({ socket });
    },
    disconnect: () => {
        const { socket } = useSocketStore.getState();
        if (socket) {
            socket.disconnect();
        }
        set({ socket: null });
    },
}));