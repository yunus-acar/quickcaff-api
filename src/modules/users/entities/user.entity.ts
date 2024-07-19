import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import { BaseEntity } from 'src/shared/database/base.entity';
import { Role } from '../enum/role.enum';
import { JobEntity } from 'src/modules/jobs/entities/job.entity';
import { CoffeeEntity } from 'src/modules/coffees/entities/coffee.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    enumName: 'user_roles',
  })
  role: Role;

  @Column({
    default: false,
  })
  isAccountDisabled: boolean;

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column('bool', { default: false })
  isEmailVerified: boolean;

  @ManyToOne(() => JobEntity, (job) => job.users, { nullable: true })
  job?: JobEntity;

  @Column({ nullable: true })
  jobId?: number;

  @OneToMany(() => CoffeeEntity, (coffee) => coffee.createdBy)
  selfCoffees: CoffeeEntity[];
}
