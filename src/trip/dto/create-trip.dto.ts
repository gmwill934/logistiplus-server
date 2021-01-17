import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsUUID()
  customerId: string;

  @IsNotEmpty()
  @IsNumber()
  operatorId: number;

  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
