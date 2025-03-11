import {UserRole} from "./Role";

export interface User {
    username: string;
    email: string;
    password: string;
    motivation: string;
    role: UserRole
    createdAt: Date;
}