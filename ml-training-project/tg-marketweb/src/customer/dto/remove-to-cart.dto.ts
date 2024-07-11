import { IsEmail, IsNumber } from 'class-validator';

export class RemoveFromCartDto {
  @IsNumber()
  productId: number;
}
