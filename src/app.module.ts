import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatastoreModule } from './datastore/datastore.module';
import { AuthController } from './auth/auth.controller';
import { LoginService } from './auth/login/login.service';
import { UserService } from './user/user.service';
import { SecretService } from './auth/secret/secret.service';
import { JwtService } from './auth/jwt/jwt.service';

@Module({
  imports: [DatastoreModule],
  controllers: [AppController, AuthController],
  providers: [
    AppService, 
    LoginService, 
    UserService, 
    SecretService, 
    JwtService,
  ],
})
export class AppModule {}
