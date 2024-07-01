import { IsEmail, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsEmail()
  email: string;

  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
