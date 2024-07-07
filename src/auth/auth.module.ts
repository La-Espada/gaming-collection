import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthTokenModule } from 'src/auth_token/auth_token.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService],
  imports:[
    UsersModule,
    AuthTokenModule,
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'60s'}
    })
  ],
})
export class AuthModule {}
