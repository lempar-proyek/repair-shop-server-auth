import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './login/login.dto';
import { LoginService } from './login/login.service';

@Controller('v1/auth')
export class AuthController {
    constructor(
        private loginService: LoginService
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<Object> {
        switch (loginDto.provider.toLowerCase()) {
            case 'google':
                const result = this.loginService.loginWithGoogle(
                    loginDto.credential
                )
                return result;
                break;

            default:
                throw new UnauthorizedException(`Provider '${loginDto.provider}' is denied from our service`)
        }
        // return 'ok'
    }
}
