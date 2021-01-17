import { Customer } from 'src/customer/entities/customer.entity';
import { Operator } from 'src/operator/entities/operator.entity';
import { Trailer } from 'src/trailer/entities/trailer.entity';
import { User } from 'src/user/entities/user.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  isCompleted: boolean;

  // Relationships
  @ManyToOne(() => User, (user) => user.trip)
  createdByUser: User;

  @ManyToOne(() => Customer, (customer) => customer.trips)
  customer: Customer;

  @ManyToOne(() => Operator, (operator) => operator.trips)
  operator: Operator;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.trips)
  vehicle: Vehicle;

  @ManyToOne(() => Trailer, (trailer) => trailer.trips)
  trailer: Trailer;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
