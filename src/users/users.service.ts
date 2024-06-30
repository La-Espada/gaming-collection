import { Get, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma:PrismaService, private jwtService: JwtService){}

  async verifyEmail(token:string):Promise<boolean>{
    const verifactionToken = await this.prisma.verificationToken.findUnique({
      where:{token},
      include:{user:true}
    });

    if (verifactionToken && verifactionToken.expiresAt > new Date()){
      const user = await this.prisma.user.findFirst({where:{id:verifactionToken.userId}})
      await this.prisma.verificationToken.create({
        data:{
          token: this.jwtService.sign(user.email),
          userId: user.id,
          expiresAt: new Date(Date.now() + 24*60*60*1000) 
        }
      })
      return true
    }
    return false
  }

  

  async doesUserExist(username:string,email:string):Promise<number>{
    const user = this.prisma.user.count({
      where:{
        OR:[
          {username},
          {email}
        ]
      }
    })

    return user;
  }

  async register(createUserDto: CreateUserDto):Promise<User>{
    const user = this.prisma.user.create({
      data:{
        username:createUserDto.username,
        email:createUserDto.email,
        password:createUserDto.password,
        actived:false
      }
    })

    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(username: string) {
    return this.prisma.user.findFirst({where:{username:username}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where:{id},
      data:updateUserDto
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({where:{id}});
  }
}
