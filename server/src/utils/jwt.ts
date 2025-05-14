import jwt from "jsonwebtoken";
import { TokenPayload } from "../types/auth";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as TokenPayload);
    });
  });
};
