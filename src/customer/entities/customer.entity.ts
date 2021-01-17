import { words } from 'capitalize';
import { Trip } from 'src/trip/entities/trip.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @OneToMany(() => Trip, (trip) => trip.customer)
  trips: Trip[];

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @BeforeInsert()
  capitalize() {
    this.name = words(this.name);
  }

  @BeforeUpdate()
  capitalizeUpdate() {
    this.name = words(this.name);
  }
}
