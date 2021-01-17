import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Trailer } from 'src/trailer/entities/trailer.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
  async findVehicleById(id: string) {
    const vehicle = await this.findOne(id);
    if (!vehicle) throw new NotFoundException(`Vehicle does not exist`);
    return vehicle;
  }
  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const vehicle = this.create(createVehicleDto);
    return await this.save(vehicle);
  }

  async updateVehicleById(id: string, updateVehicleDto: UpdateVehicleDto) {
    await this.findVehicleById(id);
    const vehicle = await this.preload({ id, ...updateVehicleDto });
    return await this.save(vehicle);
  }

  async updateVehicleStatusById(id: string) {
    const existingVehicle = await this.findVehicleById(id);
    const vehicle = await this.preload({
      id,
      isActive: !existingVehicle.isActive,
    });
    return await this.save(vehicle);
  }

  async updateVehicleTrailer(id: string, trailer: Trailer) {
    const vehicle = await this.preload({ id, trailer });
    try {
      return await this.save(vehicle);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          `Trailer '${id}' assigned to Vehicle: '${vehicle.name}' with ID: '${vehicle.id}'`,
        );
      } else {
      }
      throw new InternalServerErrorException();
    }
  }

  async updateVehicleTrailerToEmpty(id: string) {
    await this.findVehicleById(id);
    const vehicle = await this.preload({ id, trailer: null });
    return await this.save(vehicle);
  }

  async deleteVehicleById(id: string) {
    const vehicle = await this.findVehicleById(id);
    try {
      await this.remove(vehicle);
      return true;
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(`Vehicle '${id}' is in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
