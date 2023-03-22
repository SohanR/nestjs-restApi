/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';


export class CreateStudentDTO {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly roll: number;
  @IsNumber()
  @IsNotEmpty()
  readonly class: number;
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  readonly gender: string;
  @IsNumber()
  @IsNotEmpty()
  readonly marks: number;

}
