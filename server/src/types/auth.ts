import {UserRole} from "./Role";

export interface TokenPayload {
    userId: string;
    role: UserRole;
    username: string;
    iat?: number;
    exp?: number;
}