import { BaseEntity } from 'src/shared/database/base.entity';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from 'typeorm';
import { TemperatureEnum } from '../enums/temperature.enum';
import slugify from 'slugify';
import * as dayjs from 'dayjs';
import { JobEntity } from 'src/modules/jobs/entities/job.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('coffees')
export class CoffeeEntity extends BaseEntity {
  @Column({ nullable: true })
  image: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  density: string;

  @Column('text', { array: true })
  flavors: string[];

  @Column('text', { array: true })
  others: string[];

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  origin: string;

  @Column({
    nullable: true,
  })
  brewing_method: string;

  @Column({
    enum: TemperatureEnum,
    type: 'enum',
    enumName: 'serving_temperature_enum',
  })
  serving_temperature: TemperatureEnum;

  @Column({
    nullable: true,
  })
  caffeine_content: string;

  @Column('text', { array: true })
  pairing_suggestions: string[];

  @Column('text', { array: true, nullable: true })
  variations: string[];

  @Column({
    nullable: true,
  })
  history: string;

  @Column({
    enum: TemperatureEnum,
    type: 'enum',
    enumName: 'temperature_enum',
  })
  temperature: TemperatureEnum;

  @Column('bool', { default: false })
  isActive: boolean;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => JobEntity, (job) => job.coffees, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  jobs?: JobEntity[];

  @ManyToOne(() => UserEntity, (user) => user.selfCoffees, {
    nullable: true,
  })
  createdBy: UserEntity;

  @Column({ nullable: true })
  createdById: number;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(`${this.name}-${dayjs().unix()}`, { lower: true });
  }
}
