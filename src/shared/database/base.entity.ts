import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity as TOBaseEntity,
} from 'typeorm';

export class BaseEntity extends TOBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
