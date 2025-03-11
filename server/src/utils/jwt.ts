import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const verifyToken = async (token: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded as TokenPayload);
        });
    });
};