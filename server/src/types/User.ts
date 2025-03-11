export interface User {
    username: string;
    email: string;
    password: string;
    motivation: string;
    isApproved: boolean;
    createdAt: Date;
}