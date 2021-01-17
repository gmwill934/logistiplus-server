import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrailerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
