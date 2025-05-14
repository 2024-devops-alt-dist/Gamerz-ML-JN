import { Request, Response } from 'express';
import { getDB } from '../connect';
import { Channel } from '../types/Channel';

export const createChannel = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const db = getDB();
        const channelsCollection = db.collection<Channel>('channels');

        const channel: Channel = {
            name,
            createdAt: new Date()
        };

        await channelsCollection.insertOne(channel);
        res.status(201).json(channel);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create channel' });
    }
};

export const getChannels = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const channelsCollection = db.collection<Channel>('channels');
        const channels = await channelsCollection.find().toArray();
        res.json(channels);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch channels' });
    }
};