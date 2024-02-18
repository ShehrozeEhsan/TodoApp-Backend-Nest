import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { LoginSuccessDto } from '../DTO/user/login-success';
import { UserLoginDetails } from '../DTO/user/user-login-request';
import { ApiResponse } from 'src/common/api-response';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async login(userLoginDetails: UserLoginDetails): Promise<ApiResponse> {
    const user: User = await this.userRepository.findOneBy({username: userLoginDetails.username});
    if(!user){
      return new ApiResponse(false, 404, "User not found", null);
    } else {
      if(user.password === userLoginDetails.password){
        const { userId, fullName } = user;
        const loginSuccessDto: LoginSuccessDto = {
          userId,
          fullName
        };
        return new ApiResponse(true, 200, "User authenticated successfully", loginSuccessDto); 
      } else {
        return new ApiResponse(false, 401, "Wrong password", null);
      }
    }
  }

}