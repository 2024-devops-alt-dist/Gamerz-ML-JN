import {UserRole} from "./Role";
import {ObjectId} from "mongodb";

export interface User {
    userId?: ObjectId
    username: string
    email: string
    password: string
    motivation: string
    role: UserRole
    createdAt: Date
}