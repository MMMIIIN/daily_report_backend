import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.create.dto';
import { LoginUserDto } from './dto/user.login.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getOneUser(@Query('email') userEmail: string): Promise<String> {
    return this.userService.findOneUser(userEmail);
  }

  @Get('cookie')
  async cookieTest(@Req() request: Request) {
    console.log(request.cookies);
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
  async loginUser(
    @Body() user: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = this.userService.loginUser(user);
    if ((await jwt).length > 20) {
      response.cookie('jwt', jwt, { httpOnly: true });
      return 'success!!';
    } else {
      return 'login fail';
    }
  }

  @Post('logout')
  async logoutUser(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return 'logout success';
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
