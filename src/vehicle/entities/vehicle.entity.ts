import { words } from 'capitalize';
import { Trailer } from 'src/trailer/entities/trailer.entity';
import { Trip } from 'src/trip/entities/trip.entity';
import { User } from 'src/user/entities/user.entity';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  isActive: boolean;

  // Relationships
  @OneToMany(() => Trip, (trip) => trip.vehicle)
  trips: Trip[];

  @OneToOne(() => Trailer, { nullable: true })
  @JoinColumn()
  trailer: Trailer;

  @ManyToOne(() => User, (user) => user.vehicle)
  createdByUser: User;

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
