import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class TodoService {

  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>){}

  async create(createTodoDto: CreateTodoDto) {
    await this.todoRepository.save(createTodoDto);
    return 'Successfully added new todo';
  }

  async findAllPending(userId: number): Promise<Todo[]> {
    const todos = await this.todoRepository.createQueryBuilder("todo")
        .where("todo.userId = :userId", { userId })
        .andWhere("todo.completionStatus = :completionStatus", { completionStatus: false })
        .orderBy("todo.createdAt", "ASC")
        .getMany();

    if (todos.length === 0) {
        throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    }

    return todos;
  }

  async findAllCompleted(userId: number): Promise<Todo[]> {
    const todos = await this.todoRepository.createQueryBuilder("todo")
        .where("todo.userId = :userId", { userId })
        .andWhere("todo.completionStatus = :completionStatus", { completionStatus: true })
        .orderBy("todo.createdAt", "ASC")
        .getMany();

    if (todos.length === 0) {
        throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    }
    return todos;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id, updateTodoDto);
  }

  async updateStatus(id: number) {
    const todo = await this.todoRepository.findOneBy({todoId: id});
    console.log(todo)
    todo.completionStatus = true;
    await this.todoRepository.save(todo);
  }

  async remove(id: number) {
    await this.todoRepository.delete(id);
  }
}
