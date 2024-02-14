import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginSuccessDto } from './dto/login-success.dto';
import { UserLoginDetails } from './utils/user-login-details';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async login(userLoginDetails: UserLoginDetails): Promise<LoginSuccessDto> {
    const user: User = await this.userRepository.findOneBy({username: userLoginDetails.username});
    if(!user){
      throw new NotFoundException("No user found");
    } else {
      if(user.password === userLoginDetails.password){
        const { userId, fullName } = user;
        const loginSuccessDto: LoginSuccessDto = {
          userId,
          fullName
        };
        return loginSuccessDto;
      } else {
        throw new UnauthorizedException("Authorization failed")
      }
    }
  }

}