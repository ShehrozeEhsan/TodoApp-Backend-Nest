import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { CreateTodoDto } from 'src/DTO/todo/create-todo';
import { UpdateTodoDto } from 'src/DTO/todo/update-todo';
import { ApiResponse } from 'src/common/api-response';
import { AuthGuard } from 'src/guard/auth.guard';
import { Request } from 'express';
import { PaginationDto } from 'src/DTO/todo/pagination';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/role.enum';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create-todo')
  create(
    @Req() request: Request,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<ApiResponse> {
    return this.todoService.create(request.user.sub, createTodoDto);
  }

  @Roles(Role.USER)
  @Get('get-all-pending')
  findAllPending(@Query() paginationDto: PaginationDto ,@Req() request: Request): Promise<ApiResponse> {
    return this.todoService.findAllPending(paginationDto,request.user.sub);
  }

  @Get('get-all-pending-count')
  findAllPendingCount(@Req() request: Request): Promise<ApiResponse> {
    return this.todoService.findAllPendingCount(request.user.sub);
  }

  @Get('get-all-completed')
  findAllCompleted(@Req() request: Request): Promise<ApiResponse> {
    const accessToken = request.accessToken;
    return this.todoService.findAllCompleted(request.user.sub);
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
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
