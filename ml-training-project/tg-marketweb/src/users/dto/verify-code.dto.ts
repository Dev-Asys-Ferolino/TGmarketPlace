import { IsEmail, IsString } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  email: string;
  @IsString()
  resetCode: string;
}
