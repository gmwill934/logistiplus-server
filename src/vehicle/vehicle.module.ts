import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRepository } from './vehicle.repository';
import { TrailerRepository } from 'src/trailer/trailer.repository';
import { TrailerModule } from 'src/trailer/trailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleRepository, TrailerRepository]),
    TrailerModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
