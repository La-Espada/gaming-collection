import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as nodemailer from 'nodemailer';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService,
        private jwtService: JwtService
    ){}

    async register(registerDto:RegisterDto):Promise<{access_token:string}>{
        const doesUserExist = await this.usersService.doesUserExist(registerDto.email,registerDto.username);
        if(doesUserExist > 0){

        }
        else{
            const user:CreateUserDto = {
                username: registerDto.username,
                email: registerDto.email,
                password:registerDto.password
                
            }
            const registeredUser = await this.usersService.register(user)
            const payload ={sub: registeredUser.id,username:registeredUser.username};
            var access_token = await this.jwtService.signAsync(payload)
            this.sendVerificationEmail(registerDto.email, access_token)
            return {
                access_token: access_token
            } 
        }
    }

    async signIn(username:string, pass:string):Promise<{access_token:string}>{
        const user = await this.usersService.findOne(username)
        if(user?.password!==pass){
            throw new UnauthorizedException();
        }
        const payload = {sub:user.id,username:user.username}
        return {
            access_token:await this.jwtService.signAsync(payload)
        }
    }

    private async sendVerificationEmail(email:string, token:string){
        const transporter = nodemailer.createTransport({
          service:'gmail',
          auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
          },
        })
        const url = `http://localhost:4000/user/verify?token=${token}`
        await transporter.sendMail({
          to: email,
          subject: 'Email Verification',
          html: `Click <a href="${url}">here</a> to verify your email.`,
        });
      }
}
