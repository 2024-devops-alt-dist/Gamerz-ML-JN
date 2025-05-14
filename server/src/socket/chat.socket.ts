import { Server, Socket } from 'socket.io';
import { getDB } from '../connect';
import { Message } from '../types/Message';

export const setupChatSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const db = getDB();
        const messagesCollection = db.collection<Message>('messages');

        socket.on('joinChannel', (channelId: string) => {
            socket.join(channelId);
        });

        socket.on('leaveChannel', (channelId: string) => {
            socket.leave(channelId);
        });

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

        socket.on('getMessages', async (channelId: string) => {
            try {
                const messages = await messagesCollection
                    .find({ channelId })
                    .limit(50)
                    .toArray();

                socket.emit('messageHistory', messages);
            } catch (error) {
                socket.emit('error', 'Failed to fetch messages');
            }
        });
    });
};