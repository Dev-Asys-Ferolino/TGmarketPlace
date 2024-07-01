import { IsEmail, IsNumber } from 'class-validator';

export class RemoveFromCartDto {
  @IsEmail()
  email: string;
  @IsNumber()
  productId: number;
}
