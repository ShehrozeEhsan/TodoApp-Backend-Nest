import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './module/todo.module';
import { UserModule } from './module/user.module';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './module/auth.module';
import { AuthMiddleware } from './middleware.ts/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';
import { LoggerService } from './service/logger.service';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TodoModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, LoggerService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
