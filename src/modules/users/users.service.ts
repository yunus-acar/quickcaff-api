import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { CreateUserDto } from './inputs/create-user.input';
import { UpdateUserDto } from './inputs/update-user.input';

import { UsersRepository } from './users.repository';
import { UserPayload } from './payloads/user.payload';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class UsersService {
  constructor(
    private repository: UsersRepository,
    private jobsService: JobsService,
  ) {}

  async createUser(dto: CreateUserDto) {
    dto.password = await hash(dto.password, 10);

    return this.repository.createUser(dto);
  }

  async validateEmailPassword(email: string, pass: string) {
    const user = await this.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid email or password');

    const match = await compare(pass, user.password);
    if (!match) throw new UnauthorizedException('Invalid email or password');

    return user;
  }

  async getUsers(
    limit: number,
    offset: number,
  ): Promise<{ users: UserPayload[]; count: number }> {
    return this.repository.getUsers(limit, offset);
  }

  async getUserById(id: number): Promise<UserPayload> {
    return this.repository.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return await this.repository.getUserByEmail(email);
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await hash(dto.password, 10);
    }

    return this.repository.updateUser(userId, dto);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.repository.deleteUser(id);
  }

  async emailVerified(id: number): Promise<boolean> {
    await this.repository.updateUser(id, { isEmailVerified: true });
    return true;
  }

  async getJob(userId: number) {
    return this.jobsService.getJobByUserId(userId);
  }
}
