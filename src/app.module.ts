import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthTokenModule } from './auth_token/auth_token.module';

@Module({
  imports: [PrismaModule, UsersModule,AuthModule, AuthTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
