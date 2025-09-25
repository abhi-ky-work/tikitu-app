import { IsEmail, IsString } from "class-validator";


export class AuthSignInDto{

    @IsEmail()
    @IsString()
    email : string;

    @IsString()
    @IsString()
    password : string;
}