import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenRes } from '../token/token.res';
import { OAuth2Client } from "google-auth-library";
import { UserService } from '../../user/user.service';
import { compare as bcryptCompare } from "bcrypt";
import { decode as b64Decode } from "js-base64";
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class LoginService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async checkIdentityExist(identity: string): Promise<boolean> {
        const foundUserByEmail = await this.userService.getUserByEmail(identity);
        if (foundUserByEmail !== null) {
            return true;
        }

        const foundUserByUsername = await this.userService.getUserByUsername(identity);
        if (foundUserByUsername !== null) {
            return true;
        }

        return false;
    }

    async loginLocal(identity: string): Promise<TokenRes> {
        const decodedIdentity = b64Decode(identity);

        const splittedIdentity = decodedIdentity.split(/:(.*)/s);
        if (splittedIdentity.length !== 3) {
            throw new BadRequestException("Bad identity format. It must be encoded base64 string with format value '(username/email):(password)'")
        }

        const username = splittedIdentity[0];
        const password = splittedIdentity[1];

        let foundUser = await this.userService.getUserByEmail(username);
        if (foundUser === null) {
            foundUser = await this.userService.getUserByUsername(username);
            if (foundUser === null) {
                throw new UnauthorizedException("Unauthorized");
            }
        }

        if (!(await bcryptCompare(password, foundUser.password))) {
            throw new UnauthorizedException("Unauthorized");
        }

        return {
            accessToken: await this.jwtService.generateAccessToken(foundUser),
            type: 'Bearer',
            expiredIn: 900,
            refreshToken: '',
        }
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
