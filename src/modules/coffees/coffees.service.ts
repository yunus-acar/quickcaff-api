import { Injectable } from '@nestjs/common';
import { CoffeesRepository } from './coffees.repository';
import { CreateCoffeeInput } from './inputs/create-coffee.input';
import { CoffeePayload } from './payloads/coffee.payload';
import { GetFilterableAttributesArgs } from './args/get-filterable-attributes.arg';
import { GetFilteredCoffeesArgs } from './args/get-filtered-coffees.arg';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class CoffeesService {
  constructor(
    private readonly repository: CoffeesRepository,
    private readonly awsService: AwsService,
  ) {}

  async getCoffees() {
    return this.repository.getCoffees();
  }

  async getCoffeeById(id: number) {
    return this.repository.getCoffeeById(id);
  }

  async createCoffee(
    data: CreateCoffeeInput,
    userId?: number,
  ): Promise<CoffeePayload> {
    const jobIds = data.jobIds;
    delete data.jobIds;

    if (userId) {
      data.createdById = userId;
    }

    const image = await data.image;
    const file = await this.awsService.uploadFile(image.file);

    data.imagePath = file.key;

    const createdCoffee = await this.repository.createCoffee(data);
    if (data.image) {
    }
    if (jobIds.length) {
      const promises: any = [];

      jobIds.forEach((jobId) => {
        promises.push(
          this.repository.connectJobToCoffee(createdCoffee.id, jobId),
        );
      });

      await Promise.all(promises);
    }

    return createdCoffee;
  }

  async deleteCoffee(id: number) {
    return this.repository.deleteCoffee(id);
  }

  async connectJobToCoffee(coffeeId: number, jobId: number) {
    return this.repository.connectJobToCoffee(coffeeId, jobId);
  }

  async disconnectJobFromCoffee(coffeeId: number, jobId: number) {
    return this.repository.disconnectJobFromCoffee(coffeeId, jobId);
  }

  async getCoffeeBySlug(slug: string) {
    return this.repository.getCoffeeBySlug(slug);
  }

  async getFilterableAttributes(dto: GetFilterableAttributesArgs) {
    const attributes = await this.repository.getFilterableAttributes(dto);

    return attributes.map((attribute) => attribute[dto.key]);
  }

  async getFilteredCoffees(dto: GetFilteredCoffeesArgs) {
    return this.repository.getFilteredCoffees(dto);
  }
}
