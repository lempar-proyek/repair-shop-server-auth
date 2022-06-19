import { Body, Controller, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './login/login.dto';
import { LoginService } from './login/login.service';

@Controller('v1/auth')
export class AuthController {
    constructor(
        private loginService: LoginService
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<Object> {
        switch (loginDto.provider.toLowerCase()) {
            // case 'google':
            // TODO('')
            // break;

            case 'check':
                const userFound = await this.loginService.checkIdentityExist(loginDto.credential);
                if(!userFound) {
                    throw new NotFoundException('user not found');
                }
                return {
                    status: 200,
                    data: 'user found'
                }

            default:
                throw new UnauthorizedException(`Provider '${loginDto.provider}' is denied from our service`)
        }
    }
}
