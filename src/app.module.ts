import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatastoreModule } from './datastore/datastore.module';
import { AuthController } from './auth/auth.controller';
import { LoginService } from './auth/login/login.service';
import { UserService } from './user/user.service';

@Module({
  imports: [DatastoreModule],
  controllers: [AppController, AuthController],
  providers: [AppService, LoginService, UserService],
})
export class AppModule {}
