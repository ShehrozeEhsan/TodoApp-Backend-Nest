import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserLoginDetails } from '../DTO/user/user-login-request';
import { ApiResponse } from 'src/common/api-response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


}