import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.create.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {
    this.todoRepository = todoRepository;
  }
  getAllUser() {
    return this.todoRepository.find();
  }

  async findUidList(uid: String): Promise<Todo[]> {
    return this.todoRepository.find({
      where: {
        uid: uid,
      },
    });
  }

  async saveTodo(todo: CreateTodoDto): Promise<void> {
    await this.todoRepository.save(todo);
  }

  async clearList() {
    await this.todoRepository.clear();
  }
}
