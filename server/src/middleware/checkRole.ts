// middleware/checkRole.ts
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/Role";
import {TokenPayload} from "../types/auth";

export const checkRole = (roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.user as TokenPayload;

            if (!payload || !roles.includes(payload.role)) {
                res.status(403).json({ message: "Forbidden" });
                return
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};