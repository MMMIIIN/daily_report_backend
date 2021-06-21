import { IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly startHour: number;

  @IsNumber()
  readonly startMinute: number;

  @IsNumber()
  readonly endHour: number;

  @IsNumber()
  readonly endMinute: number;
}
