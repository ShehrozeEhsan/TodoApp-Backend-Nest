import { PartialType } from '@nestjs/mapped-types';
import { Todo } from 'src/model/todo.entity';

export class UpdateTodoDto extends PartialType(Todo) {}
