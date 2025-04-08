import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { TokenPayload } from "../types/auth";

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
        let token  = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        req.user = await verifyToken(token);
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};