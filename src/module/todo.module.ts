import { Module } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { TodoController } from '../controller/todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../model/todo.entity';
import { User } from 'src/model/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo,User])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService]
})
export class TodoModule {}
