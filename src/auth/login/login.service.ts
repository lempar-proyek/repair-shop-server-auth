import { Injectable } from '@nestjs/common';
import { TokenRes } from '../token/token.res';
import { OAuth2Client } from "google-auth-library";
import { Datastore } from '@google-cloud/datastore';

@Injectable()
export class LoginService {
    constructor(
        private datastore: Datastore
    ) { }

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
