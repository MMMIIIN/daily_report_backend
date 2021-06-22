import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getOneUser(@Query('email') userEmail: string): Promise<String> {
    return this.userService.findOneUser(userEmail);
  }

  @Get('list')
  async showListAll() {
    return this.userService.findAll();
  }

  @Get('clear')
  async clearUser() {
    return this.userService.clearUser();
  }

  @Post('login')
  async loginUser(@Body() user: LoginUserDto) {
    return this.userService.loginUser(user);
  }

  @Post('create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Delete('delete')
  async deleteUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    this.userService.deleteUser(email, password);
  }
}
