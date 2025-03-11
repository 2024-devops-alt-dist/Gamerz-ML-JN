import {Request, Response, NextFunction, Router} from "express";
import { getDB } from "../connect";
import { User } from "../types/User";
import {ObjectId, WithId} from "mongodb";

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