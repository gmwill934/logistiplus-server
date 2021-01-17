import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { Trailer } from 'src/trailer/entities/trailer.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Trip } from './entities/trip.entity';

@EntityRepository(Trip)
export class TripRepository extends Repository<Trip> {
  async findTripById(id: string) {
    const trip = await this.findOne(id);
    if (!trip) throw new NotFoundException(`Trip does not exist`);
    return trip;
  }
  async findTripByIdWithRelations(id: string) {
    const trip = await this.createQueryBuilder('trip')
      .leftJoinAndSelect('trip.customer', 'c')
      .leftJoinAndSelect('trip.operator', 'o')
      .leftJoinAndSelect('trip.vehicle', 'v')
      .select(['trip', 'c.id', 'o.id', 'v.id'])
      .where('trip.id = :id', { id })
      .getOne();
    if (!trip) throw new NotFoundException(`Trip does not exist`);
    return trip;
  }

  async findAll() {
    return await this.createQueryBuilder('trip')
      .leftJoinAndSelect('trip.customer', 'c')
      .leftJoinAndSelect('trip.operator', 'o')
      .leftJoinAndSelect('trip.vehicle', 'v')
      .select(['trip', 'c.id', 'o.id', 'v.id'])
      .getMany();
  }

  async createTrip(
    customer: Customer,
    operator: Operator,
    vehicle: Vehicle,
    user: User,
    trailer: Trailer,
  ) {
    const trip = new Trip();
    trip.customer = customer;
    trip.operator = operator;
    trip.vehicle = vehicle;
    trip.createdByUser = user;
    trip.trailer = trailer;
    await this.save(trip);
    return trip;
  }

  async updateTripById(
    id: string,
    customer: Customer,
    operator: Operator,
    vehicle: Vehicle,
  ) {
    await this.findTripById(id);
    const trip = await this.preload({ id, customer, operator, vehicle });
    return await this.save(trip);
  }

  async updateTripToComplete(id: string) {
    await this.findTripById(id);
    const trip = await this.preload({ id, isCompleted: true });
    return await this.save(trip);
  }

  async deleteTripById(id: string) {
    const trip = await this.findTripById(id);
    try {
      await this.remove(trip);
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
