import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEntryDto {
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
