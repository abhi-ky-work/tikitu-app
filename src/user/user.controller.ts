import { Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    
    @Post('saveUserDetails')
    saveUserDetails(){
        console.log("getUserDetails called");

        return "User details saved successfully";
    }

    @Get('getUserDetails')
    getUserDetails(){
        console.log("getUserDetails called");
        return "User details fetched successfully";
    }

}
