import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';

export class UpdateVehicleDto extends PartialType(CreateCustomerDto) {}
