import { words } from 'capitalize';
import { Trip } from 'src/trip/entities/trip.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  // Relationships
  @OneToMany(() => Trip, (trip) => trip.operator)
  trips: Trip[];

  @ManyToOne(() => User, (user) => user.operator)
  createdByUser: User;

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
