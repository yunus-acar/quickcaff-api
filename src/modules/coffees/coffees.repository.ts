import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CoffeeEntity } from './entities/coffee.entity';
import { CreateCoffeeInput } from './inputs/create-coffee.input';
import { GetFilterableAttributesArgs } from './args/get-filterable-attributes.arg';
import { GetFilteredCoffeesArgs } from './args/get-filtered-coffees.arg';

@Injectable()
export class CoffeesRepository extends Repository<CoffeeEntity> {
  constructor(private dataSource: DataSource) {
    super(CoffeeEntity, dataSource.createEntityManager());
  }

  async getCoffees(): Promise<CoffeeEntity[]> {
    return this.find();
  }

  async getCoffeeById(id: number): Promise<CoffeeEntity> {
    const coffee = await this.findOne({ where: { id } });

    if (!coffee) {
      throw new Error('Coffee not found');
    }

    return coffee;
  }

  async createCoffee(data: CreateCoffeeInput): Promise<CoffeeEntity> {
    return this.create({ ...data, image: data.imagePath }).save();
  }

  async deleteCoffee(id: number): Promise<boolean> {
    const coffee = await this.getCoffeeById(id);
    await this.softDelete(coffee.id);

    return true;
  }

  async connectJobToCoffee(coffeeId: number, jobId: number) {
    const query = this.createQueryBuilder('coffees_jobs_jobs')
      .insert()
      .into('coffees_jobs_jobs')
      .values({ coffeesId: coffeeId, jobsId: jobId });

    await query.execute();
  }

  async disconnectJobFromCoffee(coffeeId: number, jobId: number) {
    const query = this.createQueryBuilder('coffees_jobs_jobs')
      .delete()
      .from('coffees_jobs_jobs')
      .where('coffeesId = :coffeeId', { coffeeId })
      .andWhere('jobsId = :jobId', { jobId });

    await query.execute();
  }

  async getCoffeeBySlug(slug: string): Promise<CoffeeEntity> {
    const coffee = await this.findOne({ where: { slug, isActive: true } });

    if (!coffee) {
      throw new Error('Coffee not found');
    }

    return coffee;
  }

  async getFilterableAttributes({
    key,
    density,
    flavors,
    others,
    pairing_suggestions,
    temperature,
  }: GetFilterableAttributesArgs) {
    const arrayFields = ['flavors', 'others', 'pairing_suggestions'];
    const query = this.createQueryBuilder('coffees');

    if (arrayFields.includes(key)) {
      query.select(`DISTINCT UNNEST(${key}) AS ${key}`);
    } else {
      query.select(`DISTINCT ${key}`);
    }

    if (temperature) {
      query.andWhere('temperature = :temperature', { temperature });
    }

    if (flavors?.length) {
      query.andWhere('flavors @> :flavors', { flavors });
    }

    if (density) {
      query.andWhere('density = :density', { density });
    }

    if (pairing_suggestions?.length) {
      query.andWhere('pairing_suggestions @> :pairing_suggestions', {
        pairing_suggestions,
      });
    }

    if (others?.length) {
      query.andWhere('others @> :others', { others });
    }

    return query.getRawMany();
  }

  async getFilteredCoffees({
    density,
    flavors,
    others,
    pairing_suggestions,
    temperature,
  }: GetFilteredCoffeesArgs) {
    const query = this.createQueryBuilder('coffees')
      .select('*')
      .where('"isActive" = true');

    if (temperature) {
      query.andWhere('temperature = :temperature', { temperature });
    }

    if (flavors) {
      query.andWhere('flavors @> :flavors', { flavors });
    }

    if (density) {
      query.andWhere('density = :density', { density });
    }

    if (pairing_suggestions) {
      query.andWhere('pairing_suggestions @> :pairing_suggestions', {
        pairing_suggestions,
      });
    }

    if (others) {
      query.andWhere('others @> :others', { others });
    }

    return query.getRawMany();
  }
}
