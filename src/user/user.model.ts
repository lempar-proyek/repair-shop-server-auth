export class User {
    id: string;
    username: string;
    email: string;
    gid: string;
    name: string;
    picture: string | null;
    blocked: boolean;
    expiredTime: number = 0;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}