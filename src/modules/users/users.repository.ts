import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './inputs/update-user.input';
import { CreateUserDto } from './inputs/create-user.input';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    return this.save(user);
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.findOne({ where: { email } });
  }

  async getUsers(
    limit: number,
    offset: number,
  ): Promise<{ users: UserEntity[]; count: number }> {
    const [users, count] = await this.findAndCount({
      take: limit,
      skip: offset,
    });

    return { users, count };
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<UserEntity> {
    const userToUpdate = await this.getUserById(id);

    return this.save({ ...userToUpdate, ...user });
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.getUserById(id);

    await this.softDelete(user.id);

    return true;
  }
}
