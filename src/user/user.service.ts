import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/user.login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // this.userRepository = userRepository;
  }

  async findOneUser(userEmail: string): Promise<String> {
    const user = await this.userRepository.findOne({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      return 'success';
    } else {
      return 'fail';
    }
    // const user = await this.userRepository.findOne({ email: userEmail });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async loginUser(data: LoginUserDto): Promise<String> {
    console.log(data);
    const user = await this.userRepository.findOne({ email: data.email });
    console.log(user ?? 'null');
    if (user) {
      const pwCheck = await bcrypt.compare(data.password, user.password);
      if (pwCheck) {
        const jwt = await this.jwtService.signAsync({ id: user.id });
        console.log(jwt ?? 'null jwt');
        return jwt;
      } else {
        return 'fail';
      }
    }
    return '해당 user가 없습니다. ';
  }

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      console.log(data.email);
      const user = await this.userRepository.findOne(data.email);
      if (user) {
        throw new HttpException(
          '해당 email이 존재합니다. ',
          HttpStatus.BAD_REQUEST,
        );
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

  async clearUser() {
    this.userRepository.clear();
  }
}
