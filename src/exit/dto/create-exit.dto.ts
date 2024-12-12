import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateExitDto {
  @IsString()
  @IsNotEmpty()
  officeProductId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsOptional()
  observation: string;
}
