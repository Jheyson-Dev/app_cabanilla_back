import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class InventoryDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  officeId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsOptional()
  observation: string;
}
