import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateOperatorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
