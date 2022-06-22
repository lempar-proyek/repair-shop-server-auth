import { Injectable } from '@nestjs/common';
import { sign as jwtSign } from "jsonwebtoken";
import { User } from '../../user/user.model';
import { SecretService } from '../secret/secret.service';

@Injectable()
export class JwtService {
    constructor(
        private secretService: SecretService
    ) { }

    async generateAccessToken(user: User): Promise<string> {
        const now = new Date();
        const expiresDate = new Date();
        expiresDate.setMinutes(expiresDate.getMinutes() + 15)

        const payload = {
            iss: 'repair-shop-server',
            aud: 'repair-shop-server',
            sub: user.id,
            exp: Math.floor(expiresDate.getTime() / 1000),
            iat: Math.floor(now.getTime() / 1000),
        };

        const privateKey = await this.secretService.getPrivateJwtKey()

        return jwtSign(payload, privateKey, { algorithm: 'RS256' });
    }
}
