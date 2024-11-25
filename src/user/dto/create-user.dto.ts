import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  dni: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  password: string;
}
