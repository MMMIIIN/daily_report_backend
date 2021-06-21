import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('list')
  async findAllUser(): Promise<Todo[]> {
    return this.todoService.getAllUser();
  }

  @Post('save')
  async saveList(@Body() todo: Todo): Promise<string> {
    await this.todoService.saveTodo(todo);
    return 'success!!';
  }
}
