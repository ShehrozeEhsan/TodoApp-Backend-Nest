import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { UserModule } from 'src/module/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants';
import { LoggerService } from 'src/service/logger.service';

@Module({
  imports:[UserModule,  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService,LoggerService],
  exports: [AuthService]
})
export class AuthModule {}
