import { Injectable } from '@nestjs/common';
import { TokenRes } from '../token/token.res';
import { OAuth2Client } from "google-auth-library";
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoginService {
    constructor(
        private userService: UserService
    ) { }

    async checkIdentityExist(identity: string): Promise<boolean> {
        const foundUserByEmail = await this.userService.getUserByEmail(identity);
        if(foundUserByEmail !== null) {
            return true;
        }

        const foundUserByUsername = await this.userService.getUserByUsername(identity);
        if(foundUserByUsername !== null) {
            return true;
        }

        return false;
    }

    async loginWithGoogle(gidToken: string): Promise<Object> {
        const authClient = new OAuth2Client(process.env.SERVER_ID)
        const ticket = await authClient.verifyIdToken({
            idToken: gidToken,
            audience: process.env.SERVER_ID,
        });

        const payload = ticket.getPayload();

        return payload;
    }
}
