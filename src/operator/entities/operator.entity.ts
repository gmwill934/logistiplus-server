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
export class Operator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, default: true, type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => Trip, (trip) => trip.operator)
  trips: Trip[];

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;

  @BeforeInsert()
  capitalize() {
    this.name = words(this.name);
    this.lastName = words(this.lastName);
  }

  @BeforeUpdate()
  capitalizeUpdate() {
    this.name = words(this.name);
    this.lastName = words(this.lastName);
  }
}
