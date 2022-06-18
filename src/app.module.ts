import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatastoreModule } from './datastore/datastore.module';
import { AuthController } from './auth/auth.controller';
import { LoginService } from './auth/login/login.service';

@Module({
  imports: [DatastoreModule],
  controllers: [AppController, AuthController],
  providers: [AppService, LoginService],
})
export class AppModule {}
