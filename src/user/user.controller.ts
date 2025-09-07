import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDetailsDto, SaveUserDetailsDto } from 'src/dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    

    @Post('saveUserDetails')
    saveUserDetails(@Body() dto : SaveUserDetailsDto){
        console.log("Request Body: ", dto);
        return this.userService.saveUserDetails(dto);
    }

    @Get('getUserDetails')
    getUserDetails(@Body() dto : GetUserDetailsDto){
        console.log("getUserDetails called");
        return this.userService.getUserDetails(dto);
    }

}
