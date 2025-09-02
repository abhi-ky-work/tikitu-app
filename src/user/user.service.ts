import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

}
