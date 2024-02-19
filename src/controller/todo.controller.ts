import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Header,
  Req,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { CreateTodoDto } from 'src/DTO/todo/create-todo';
import { UpdateTodoDto } from 'src/DTO/todo/update-todo';
import { ApiResponse } from 'src/common/api-response';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create-todo')
  create(
    @Req() request: Request,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<ApiResponse> {
    const accessToken = request.accessToken;
    return this.todoService.create(accessToken, createTodoDto);
  }

  @Get('get-all-pending')
  findAllPending(@Req() request: Request): Promise<ApiResponse> {
    const accessToken = request.accessToken;
    return this.todoService.findAllPending(accessToken);
  }

  @Get('get-all-completed')
  findAllCompleted(@Req() request: Request): Promise<ApiResponse> {
    const accessToken = request.accessToken;
    return this.todoService.findAllCompleted(accessToken);
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
