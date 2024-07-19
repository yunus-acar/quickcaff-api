import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { JobEntity } from './entities/job.entity';

@Injectable()
export class JobsRepository extends Repository<JobEntity> {
  constructor(private dataSource: DataSource) {
    super(JobEntity, dataSource.createEntityManager());
  }

  async getJobs(): Promise<JobEntity[]> {
    return this.find();
  }

  async getJobByUserId(userId: number): Promise<JobEntity> {
    return this.createQueryBuilder('job')
      .leftJoinAndSelect('job.users', 'user')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async getJobsByCoffeeId(coffeeId: number): Promise<JobEntity[]> {
    return this.createQueryBuilder('job')
      .leftJoinAndSelect('job.coffees', 'coffee')
      .where('coffee.id = :coffeeId', { coffeeId })
      .getMany();
  }

  async getJobById(id: number): Promise<JobEntity> {
    return this.findOne({ where: { id } });
  }

  async getCoffeesByJobId(jobId: number) {
    const job = await this.createQueryBuilder('job')
      .leftJoinAndSelect('job.coffees', 'coffee')
      .where('job.id = :jobId', { jobId })
      .getOne();

    return job.coffees;
  }
}
