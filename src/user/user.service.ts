import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exception } from 'console';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user.login.dto';
import { iif } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(userEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: userEmail,
      },
    });
    console.log('good');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async loginUser(user: LoginUserDto): Promise<String> {
    console.log(user);
    const userPassword = (await this.findOne(user.email)).password;
    console.log(userPassword);
    const pw = await bcrypt.compare(user.password, userPassword);
    console.log(pw);
    return 'success';
  }

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      const user = await this.findOne(data.email);
      console.log(`user = ${user.email}`);
      console.log(Boolean(user));
      if (user) {
        throw new HttpException('400', HttpStatus.BAD_REQUEST);
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 12);
        data.password = hashedPassword;
        return this.userRepository.save(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(email: string, password: string) {
    this.userRepository.delete({ email: email });
  }
}
