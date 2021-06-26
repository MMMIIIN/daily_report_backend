import { IsDate, IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  uid: string;

  @Column()
  @IsNumber()
  year: number;

  @Column()
  @IsNumber()
  month: number;

  @Column()
  @IsNumber()
  day: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsNumber()
  startHour: number;

  @Column()
  @IsNumber()
  startMinute: number;

  @Column()
  @IsNumber()
  endHour: number;

  @Column()
  @IsNumber()
  endMinute: number;
}
