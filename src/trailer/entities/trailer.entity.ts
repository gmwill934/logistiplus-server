import { words } from 'capitalize';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Trailer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  isActive: boolean;

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
