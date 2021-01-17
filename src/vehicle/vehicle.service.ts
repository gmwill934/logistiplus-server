import { Injectable } from '@nestjs/common';
import { TrailerService } from 'src/trailer/trailer.service';
import { User } from 'src/user/entities/user.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly trailerService: TrailerService,
  ) {}
  async findAll() {
    return await this.vehicleRepository.findAll();
  }

  async findOne(id: string) {
    return await this.vehicleRepository.findVehicleById(id);
  }

  async create(createVehicleDto: CreateVehicleDto, user: User) {
    return await this.vehicleRepository.createVehicle(createVehicleDto, user);
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return await this.vehicleRepository.updateVehicleById(id, updateVehicleDto);
  }

  async updateStatus(id: string) {
    return await this.vehicleRepository.updateVehicleStatusById(id);
  }

  async updateTrailer(id: string, trailerId: string) {
    await this.findOne(id);
    const trailer = await this.trailerService.findOne(trailerId);
    return await this.vehicleRepository.updateVehicleTrailer(id, trailer);
  }

  async updateTrailerToEmpty(id: string) {
    return await this.vehicleRepository.updateVehicleTrailerToEmpty(id);
  }

  async delete(id: string) {
    return await this.vehicleRepository.deleteVehicleById(id);
  }
}
