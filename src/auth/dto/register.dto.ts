import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty()
    username:string;
    @ApiProperty()
    email:string;
    @ApiProperty()
    email_repeat:string
    @ApiProperty()
    password:string;
    @ApiProperty()
    password_repeat:string

}
