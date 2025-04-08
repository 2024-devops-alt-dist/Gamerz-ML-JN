import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { TokenPayload } from "../types/auth";

// Extend Express Request type
declare module "express" {
    interface Request {
        user?: TokenPayload;
    }
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let token = req.headers.authorization?.split(" ")[1];

        if (!token && req.cookies) {
            token = req.cookies.token || req.cookies.authToken; // Use your cookie name here
        }

        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};