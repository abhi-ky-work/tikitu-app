import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto } from 'src/dto/dtoAuth';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signin')
    signin(@Body() dto : AuthSignInDto ) : Promise<{access_token : string}> {
        
        return this.authService.signin(dto);
    }
}
