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

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({username: username})
  }

}