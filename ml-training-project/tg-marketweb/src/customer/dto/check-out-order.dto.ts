import { IsEmail } from 'class-validator';

export class CheckOutOrderDto {
  @IsEmail()
  email: string;
}
