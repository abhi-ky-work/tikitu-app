import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from 'src/dto/dtoAuth';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma : PrismaService, 
        private configure : ConfigService, 
        private jwt : JwtService
    ){}

    async signin(dto: AuthSignInDto) : Promise<{access_token : string}> {

        try {
            const creds = await this.prisma.user.findUnique({
                where : { 
                    email : dto.email
                },
                select :{
                    email : true,
                    passwordHash : true,
                    id : true
                }
            })

        if( creds && creds.passwordHash === dto.password ){
            const payLoad = {
                id : creds.id,
                email : creds.email, 
                passwordHash : creds.passwordHash
            }
            const jwtSecret = this.configure.get("JWT_SECRET")
            const token = this.jwt.signAsync(
                payLoad,
                {
                    secret : jwtSecret,
                    expiresIn : '7d'
                }
            )
        }

        } catch (error) {
            
        }
        return Promise.resolve({access_token : "hjgkjh"});
    }


    jwtSign(data){

    }
}
