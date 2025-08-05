/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  urlToDoc?: string = '';

  @IsString()
  sex?: string = '';

  @IsString()
  phone: string;

  @IsString()
  role: 'VENDOR' | 'BUYER';
}
