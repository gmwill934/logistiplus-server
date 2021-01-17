import { Customer } from 'src/customer/entities/customer.entity';
import { Operator } from 'src/operator/entities/operator.entity';
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

  @ManyToOne(() => Customer, (customer) => customer.trips)
  customer: Customer;

  @Column({ nullable: false, type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => Operator, (operator) => operator.trips)
  operator: Operator;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.trips)
  vehicle: Vehicle;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
