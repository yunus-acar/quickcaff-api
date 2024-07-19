import { CoffeeEntity } from 'src/modules/coffees/entities/coffee.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { BaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';

@Entity('jobs')
export class JobEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => UserEntity, (user) => user.job)
  users: UserEntity[];

  @ManyToMany(() => CoffeeEntity, (coffee) => coffee.jobs, {
    onDelete: 'SET NULL',
  })
  coffees: CoffeeEntity[];
}
