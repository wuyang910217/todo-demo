import { IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  public content: string;

  // @IsBoolean()
  // public completed?: boolean;
}
