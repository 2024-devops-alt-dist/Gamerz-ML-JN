import { Request, Response, NextFunction } from "express";
import { getDB } from "../connect";
import { User } from "../types/User";
import { ObjectId, WithId } from "mongodb";
import { UserRole } from "../types/Role";

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = new ObjectId(req.params.userId);
        const db = getDB();
        const userCollection = db.collection<WithId<User>>("user");

        const result = await userCollection.deleteOne({
            _id: userId as unknown as WithId<User>["_id"]
        });

        if (result.deletedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const approveUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = new ObjectId(req.params.userId);
        const db = getDB();
        const usersCollection = db.collection<User>("user");

        const result = await usersCollection.updateOne(
            { _id: userId },
            {
                $set: {
                    role: UserRole.GAMER
                }
            }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User approved and role updated" });
    } catch (error) {
        next(error);
    }
};

export const banUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = new ObjectId(req.params.userId);
        const db = getDB();
        const usersCollection = db.collection<User>("user");

        const result = await usersCollection.updateOne(
            { _id: userId },
            {
                $set: {
                    role: UserRole.BANNED
                }
            }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User is banned" });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const usersCollection = db.collection<User>("user");
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users" });
    }
}