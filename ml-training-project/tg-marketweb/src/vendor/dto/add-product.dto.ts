import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AddProductDto {
  @IsString()
  name: string;

  @IsString()
  price: number;

  @IsString()
  description: string;

  @IsString()
  stock: number;

  @IsEmail()
  email: string;
}
