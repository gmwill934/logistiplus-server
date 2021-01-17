import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
