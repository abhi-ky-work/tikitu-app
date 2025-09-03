import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { SaveUserDetailsDto } from 'src/dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    

    @Post('saveUserDetails')
    saveUserDetails(@Body() dto : SaveUserDetailsDto){
        console.log("Request Body: ", dto);
        return this.userService.saveUserDetails();
    }

    @Get('getUserDetails')
    getUserDetails(){
        console.log("getUserDetails called");
        return this.userService.getUserDetails();
    }

}
