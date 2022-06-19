import { User } from "../../user/user.model"

export class RefreshToken {
    id: string;
    user: User;
    userAgent: string;
    device: string | null;
    platform: string | null;
    expiredAt: Date;
    revoked: boolean;
    createdAt: Date;
}