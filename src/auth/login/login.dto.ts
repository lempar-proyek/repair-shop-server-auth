import { IsString } from "class-validator";

export class LoginDto {
    @IsString()
    provider: string;

    @IsString()
    credential: string;
}