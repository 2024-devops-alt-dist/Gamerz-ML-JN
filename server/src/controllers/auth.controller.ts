// server/src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { getDB } from "../connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../types/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, email, password, motivation } = req.body;
        const db = getDB();
        const usersCollection = db.collection<User>("users");

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: User = {
            username,
            email,
            password: hashedPassword,
            motivation,
            isApproved: false,
            createdAt: new Date(),
        };

        const result = await usersCollection.insertOne(newUser);

        const token = jwt.sign(
            { userId: result.insertedId },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;
        const db = getDB();
        const usersCollection = db.collection<User>("users");

        const user = await usersCollection.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: "Login successful" });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};