import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create-todo')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get('get-all-pending/:id')
  findAllPendng(@Param('id') id: number) {
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

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
