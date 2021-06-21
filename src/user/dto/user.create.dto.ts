import { IsNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto implements User {
  id?: number;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  birth: number;
}
