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

  async activedUser(username:string):Promise<void>{
    const user = await this.prisma.user.findFirst({
      where:{username}
    })
    user.actived=true;
    
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(username: string) {
    return this.prisma.user.findFirst({where:{username:username}});
  }
  findById(id: number) {
    return this.prisma.user.findFirst({where:{id}});
  }



  async updateActiveState(username) {
    return await this.prisma.user.update({
      where:{username},
      data:{actived:true}
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({where:{id}});
  }
}
