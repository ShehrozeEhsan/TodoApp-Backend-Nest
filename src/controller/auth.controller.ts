import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserLoginDetails } from 'src/DTO/user/user-login-request';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() UserLoginDetails: UserLoginDetails) {
      return this.authService.signIn(UserLoginDetails.username, UserLoginDetails.password);
    }
}
