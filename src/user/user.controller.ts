import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginSuccessDto } from './dto/login-success.dto';
import { UserLoginDetails } from './utils/user-login-details';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() UserLoginDetails: UserLoginDetails): Promise<LoginSuccessDto> {
    return await this.userService.login(UserLoginDetails);
  }
  
}