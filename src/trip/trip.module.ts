import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripRepository } from './trip.repository';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerRepository } from 'src/customer/customer.repository';
import { OperatorModule } from 'src/operator/operator.module';
import { OperatorService } from 'src/operator/operator.service';
import { OperatorRepository } from 'src/operator/operator.repository';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { VehicleRepository } from 'src/vehicle/vehicle.repository';
import { TrailerService } from 'src/trailer/trailer.service';
import { TrailerRepository } from 'src/trailer/trailer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TripRepository,
      CustomerRepository,
      OperatorRepository,
      VehicleRepository,
      TrailerRepository,
    ]),
    CustomerModule,
    OperatorModule,
    VehicleModule,
  ],
  providers: [
    TripService,
    CustomerService,
    OperatorService,
    VehicleService,
    TrailerService,
  ],
  controllers: [TripController],
})
export class TripModule {}
