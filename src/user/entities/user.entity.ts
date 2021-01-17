import { Customer } from 'src/customer/entities/customer.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { Trailer } from 'src/trailer/entities/trailer.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  password: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  isActive: boolean;

  // Relationships
  @OneToMany(() => Customer, (customer) => customer.createdByUser)
  customer: Customer;

  @OneToMany(() => Operator, (operator) => operator.createdByUser)
  operator: Operator;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.createdByUser)
  vehicle: Vehicle;

  @OneToMany(() => Trailer, (trailer) => trailer.createdByUser)
  trailer: Trailer;

  @OneToMany(() => Trip, (trip) => trip.createdByUser)
  trip: Trip;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
