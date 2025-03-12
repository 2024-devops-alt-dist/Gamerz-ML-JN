import {UserRole} from "./Role";

export interface TokenPayload {
    userId: string;
    role: UserRole;
    iat?: number;
    exp?: number;
}