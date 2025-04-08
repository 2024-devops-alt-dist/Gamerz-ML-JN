export interface Message {
    _id?: string;
    channelId: string;
    userId: string;
    username: string;
    content: string;
    createdAt: Date;
}