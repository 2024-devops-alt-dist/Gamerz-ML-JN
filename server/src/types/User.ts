export interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    motivation: string;
    isApproved: boolean;
    createdAt: Date;
}