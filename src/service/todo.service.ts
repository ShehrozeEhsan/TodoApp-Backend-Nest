import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from '../DTO/todo/create-todo';
import { UpdateTodoDto } from '../DTO/todo/update-todo';
import { Todo } from '../model/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from 'src/common/api-response';
import { User } from 'src/model/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<ApiResponse> {
    try {
      const user: User = await this.userRepository.findOneBy({
        userId: createTodoDto.userId,
      });
      if (user == null) {
        return new ApiResponse(false, 409, 'User does not exist', null);
      } else {
        await this.todoRepository.save(createTodoDto);
        return new ApiResponse(true, 201, 'Todo created successfully', null);
      }
    } catch (ex) {
      console.log(ex);
      return new ApiResponse(false, 500, 'Error creating Todo', null);
    }
  }

  async findAllPending(userId: number): Promise<ApiResponse> {
    try {
      const todos = await this.todoRepository.find({
        where: {
          userId,
          completionStatus: false,
        },
        order: {
          createdAt: 'ASC',
        },
      });

      if (todos.length === 0) {
        return new ApiResponse(true, 204, 'No content', null);
      } else {
        return new ApiResponse(
          true,
          200,
          'Successfully fetched pending todos',
          todos,
        );
      }
    } catch (ex) {
      return new ApiResponse(false, 500, 'Error fetching Todos', null);
    }
  }

  async findAllCompleted(userId: number): Promise<ApiResponse> {
    try {
      const todos = await this.todoRepository.find({
        where: {
          userId,
          completionStatus: true,
        },
        order: {
          createdAt: 'ASC',
        },
      });

      if (todos.length === 0) {
        return new ApiResponse(true, 204, 'No content', null);
      } else {
        return new ApiResponse(
          true,
          200,
          'Successfully fetched completed todos',
          todos,
        );
      }
    } catch (ex) {
      return new ApiResponse(false, 500, 'Error fetching Todos', null);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<ApiResponse> {
    try {
      const todo : Todo = await this.todoRepository.findOneBy({todoId : id});
      if (todo == null){
        return new ApiResponse(false, 409, 'Todo does not exist', null);
      } else {
        await this.todoRepository.update(id, updateTodoDto);
        return new ApiResponse(true, 200, 'Successfully edited Todos', null);
      }
    } catch (ex) {
      return new ApiResponse(false, 500, 'Error updating todo', null);
    }
    
  }

  async updateStatus(id: number): Promise<ApiResponse> {
    try {
      await this.todoRepository.update(id,{completionStatus: true , updatedBy : id});
      return new ApiResponse(true, 200, 'Successfully changed todo status to completed', null);
    } catch (ex) {
      return new ApiResponse(false, 500, 'Error updating todo status', null);
    }
  }

  async updateStatusToPending(id: number) {
    try {
      await this.todoRepository.update(id,{completionStatus: false , updatedBy : id});
      return new ApiResponse(true, 200, 'Successfully changed todo status to pending', null);
    } catch (ex) {
      return new ApiResponse(false, 500, 'Error updating todo status', null);
    }
  }

  async remove(id: number) {
    try {
      await this.todoRepository.softDelete(id);
      return new ApiResponse(true, 200, 'Successfully deleted Todo', null);
    } catch (ex) {
      return new ApiResponse(false, 500, 'Error deleting todo', null);
    }
   
  }
}
