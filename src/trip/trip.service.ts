import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { OperatorService } from 'src/operator/operator.service';
import { User } from 'src/user/entities/user.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly customerService: CustomerService,
    private readonly operatorService: OperatorService,
    private readonly vehicleService: VehicleService,
  ) {}

  async findAll() {
    return await this.tripRepository.findAll();
  }

  async findOne(id: string) {
    return await this.tripRepository.findTripByIdWithRelations(id);
  }

  async create(createTripDto: CreateTripDto, user: User) {
    const { customerId, operatorId, vehicleId } = createTripDto;
    const operator = await this.operatorService.findOne(operatorId);
    const customer = await this.customerService.findOne(customerId);
    const vehicle = await this.vehicleService.findOne(vehicleId);
    const trailer = vehicle.trailer;

    if (!operator.isActive || !customer.isActive || !vehicle.isActive) {
      throw new BadRequestException(`Entities are inactive`);
    }

    if (!vehicle.trailer) {
      throw new BadRequestException(
        `No trailer attached to Vehicle '${vehicle.id}'`,
      );
    }
    return await this.tripRepository.createTrip(
      customer,
      operator,
      vehicle,
      user,
      trailer,
    );
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    const { customerId, operatorId, vehicleId } = updateTripDto;
    const operator = await this.operatorService.findOne(operatorId);
    const customer = await this.customerService.findOne(customerId);
    const vehicle = await this.vehicleService.findOne(vehicleId);
    const trailer = vehicle.trailer;
    if (!operator.isActive || !customer.isActive || !vehicle.isActive) {
      throw new BadRequestException(`Entities are inactive`);
    }
    return await this.tripRepository.updateTripById(
      id,
      customer,
      operator,
      vehicle,
      trailer,
    );
  }

  async updateTripToComplete(id: string) {
    return await this.tripRepository.updateTripToComplete(id);
  }

  async delete(id: string) {
    return await this.tripRepository.deleteTripById(id);
  }
}
