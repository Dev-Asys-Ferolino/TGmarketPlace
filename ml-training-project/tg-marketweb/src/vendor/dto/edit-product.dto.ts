import { IsEmail, IsNumber, IsString } from 'class-validator';

export class EditProductDto {
  @IsEmail()
  email: string;

  @IsNumber()
  price: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  stock: number;

  @IsString({ each: true })
  images: { image_url: string; width: number; height: number }[];
}
