import { Cart } from '@prisma/client';
import { IsArray, IsEmail, IsString } from 'class-validator';

export class CheckOutOrderDto {
  @IsArray()
  selectItems: Cart[];
}
