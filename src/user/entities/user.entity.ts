import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  birth: number;
}
