import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { CreateTodoDto } from 'src/DTO/todo/create-todo';
import { UpdateTodoDto } from 'src/DTO/todo/update-todo';
import { ApiResponse } from 'src/common/api-response';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create-todo')
  create(@Body() createTodoDto: CreateTodoDto): Promise<ApiResponse> {
    return this.todoService.create(createTodoDto);
  }

  @Get('get-all-pending/:id')
  findAllPending(@Param('id') id: number) {
    return this.todoService.findAllPending(id);
  }

  @Get('get-all-completed/:id')
  findAllCompleted(@Param('id') id: number) {
    return this.todoService.findAllCompleted(id);
  }

  @Patch('edit/:id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Patch('update-status/:id')
  updateStatus(@Param('id') id: number) {
    return this.todoService.updateStatus(id);
  }

  @Patch('update-status-to-pending/:id')
  updateStatusToPending(@Param('id') id: number) {
    return this.todoService.updateStatusToPending(id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
