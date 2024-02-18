import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './module/todo.module';
import { UserModule } from './module/user.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TodoModule, UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
