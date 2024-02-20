import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
  
  if (!user) {
    throw new UnauthorizedException('User not found');
  }
  
  const isPasswordValid = await bcrypt.compare(pass, user.password);
  
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = { sub: user.userId, roles: user.roles };
  return {
    access_token: await this.jwtService.signAsync(payload),
  };
  }
}
