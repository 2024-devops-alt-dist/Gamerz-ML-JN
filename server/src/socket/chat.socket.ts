// socket/chat.socket.ts
import { Server, Socket } from 'socket.io';
import { getDB } from '../connect';
import { Channel } from '../types/Channel';
import { Message } from '../types/Message';

export const setupChatSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const db = getDB();
        const messagesCollection = db.collection<Message>('messages');
        const channelsCollection = db.collection<Channel>('channels');

        // Join a channel
        socket.on('joinChannel', (channelId: string) => {
            socket.join(channelId);
        });

        // Leave a channel
        socket.on('leaveChannel', (channelId: string) => {
            socket.leave(channelId);
        });

        // Send message
        socket.on('sendMessage', async (data: {
            channelId: string;
            userId: string;
            username: string;
            content: string;
        }) => {
            const message: Message = {
                ...data,
                createdAt: new Date()
            };

            try {
                await messagesCollection.insertOne(message);
                io.to(data.channelId).emit('newMessage', message);
            } catch (error) {
                socket.emit('error', 'Failed to send message');
            }
        });

        // Get channel messages
        socket.on('getMessages', async (channelId: string) => {
            try {
                const messages = await messagesCollection
                    .find({ channelId })
                    .sort({ createdAt: -1 })
                    .limit(50)
                    .toArray();

                socket.emit('messageHistory', messages);
            } catch (error) {
                socket.emit('error', 'Failed to fetch messages');
            }
        });
    });
};