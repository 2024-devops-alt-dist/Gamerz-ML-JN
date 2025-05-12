// server/src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { getDB } from "../connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types/User";
import { UserRole } from "../types/Role";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password, motivation } = req.body;
    const db = getDB();
    const userCollection = db.collection<User>("user");

    const existingUser = await userCollection.findOne({ email });
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
      role: UserRole.VISITOR,
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
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
    const userCollection = db.collection<User>("user");

    const user = await userCollection.findOne({ email });
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
      {
        userId: user._id,
        role: user.role,
        username: user.username
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      token: token, // Add this line for testing and retrieve the token, but remove it in production
      user: {
        username: user.username,
        role: user.role,
        userId: user._id },
    });
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
      sameSite: "none",
    });

    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
