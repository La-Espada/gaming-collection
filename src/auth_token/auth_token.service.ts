import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, VerificationToken } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthTokenService {
    constructor(private prisma:PrismaService){}

    async registerAuthToken(user:User,token:string):Promise<VerificationToken>{
    console.log('Token: ' + token)
    const authToken = this.prisma.verificationToken.create({
                        data:{
                            token:token,
                            userId:user.id,
                            expiresAt: new Date(Date.now() + 60000)
                        }
                    })
     console.log(authToken)
     return authToken
    }


    async isValid(token:string):Promise<Boolean>{
        const authTokenExists = await this.prisma.verificationToken.count({
            where:{token}
        })

        const authToken = await this.prisma.verificationToken.findFirst({
            where:{token}
        })

        var expiresTime = authToken.expiresAt;
        var currentTime = new Date();

        const differenceInMilliseconds = currentTime.getTime() - expiresTime.getTime();
        const secondsPassed = differenceInMilliseconds/1000;
        console.log(secondsPassed<60)
        if(authTokenExists != 0 &&  60 > secondsPassed){
           
            return true
        }
        else{
            return false
        }
    }

    async getToken(token:string):Promise<VerificationToken>{
        return this.prisma.verificationToken.findFirst({where:{token}})
    }
}
