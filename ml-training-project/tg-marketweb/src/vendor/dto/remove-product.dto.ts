import { IsNumber, IsString } from "class-validator";

export class RemoveProductDto {
  @IsNumber()
  id: number;
  @IsString()
  email: string;
}
