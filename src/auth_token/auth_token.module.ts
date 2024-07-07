import { Module } from '@nestjs/common';
import { AuthTokenController } from './auth_token.controller';
import { AuthTokenService } from './auth_token.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthTokenController],
  providers: [AuthTokenService],
  exports:[AuthTokenService],
  imports:[PrismaModule]
})
export class AuthTokenModule {}
