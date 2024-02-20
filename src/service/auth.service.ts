import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/service/user.service';
import * as bcrypt from 'bcrypt';
import { LoggerService } from './logger.service';
import { ApiResponse } from 'src/common/api-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async signIn(username: string, pass: string): Promise<ApiResponse> {
    try {
      const user = await this.userService.findOne(username);

      if (!user) {
        this.logger.error('User with username: ' + username + ' not found');
        return new ApiResponse(false, 404, 'User not found', null);
      }

      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (!isPasswordValid) {
        this.logger.error(
          'User with username: ' +
            username +
            ' not logged in due to incorrect credentials',
        );
        return new ApiResponse(false, 401, 'Incorrect credentials', null);
      }

      const payload = { sub: user.userId, roles: user.roles };

      this.logger.info(
        'User with userId: ' + user.userId + ' logged in successfully',
      );

      const access_token = await this.jwtService.signAsync(payload);
      return new ApiResponse(true, 200, 'Login successful', access_token);
    } catch (ex) {
      this.logger.error('Error logging in user with exception ' + ex);
    }
  }
}
