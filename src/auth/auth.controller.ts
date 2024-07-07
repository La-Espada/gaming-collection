import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body()registerDto:RegisterDto){
        return this.authService.register(registerDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body()signInDto:SignInDto){
        return this.authService.signIn(signInDto.username,signInDto.password)
    }

    @HttpCode(HttpStatus.OK)
    @Get('verify')
    verifyToken(@Query('token') token:string){
        return this.authService.activedUser(token);
    }


}
