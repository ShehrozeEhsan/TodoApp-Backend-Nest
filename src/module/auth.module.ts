import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { UserModule } from 'src/module/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants';

@Module({
  imports:[UserModule,  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '300s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
