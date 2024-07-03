import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AddProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  stock: number;

  @IsEmail()
  email: string;

  @IsString({ each: true })
  images: { image_url: string; width: number; height: number }[];
}
