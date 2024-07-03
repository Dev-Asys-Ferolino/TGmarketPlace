import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  description: string;
}
