import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    saveUserDetails(){
        return { message : "User details saved successfully"};
    }

    getUserDetails(){
        return { message : "User details fetched successfully"};
    }
}
