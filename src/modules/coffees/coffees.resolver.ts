import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { CoffeesService } from './coffees.service';
import { CoffeePayload } from './payloads/coffee.payload';
import { CreateCoffeeInput } from './inputs/create-coffee.input';
import { JobPayload } from '../jobs/payloads/job.payload';
import { JobsService } from '../jobs/jobs.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { UserPayload } from '../users/payloads/user.payload';
import { GetFilterableAttributesArgs } from './args/get-filterable-attributes.arg';
import { GetFilteredCoffeesArgs } from './args/get-filtered-coffees.arg';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '../users/enum/role.enum';

@Resolver(() => CoffeePayload)
export class CoffeesResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly jobsService: JobsService,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CoffeePayload)
  async createCoffee(
    @Args('data') data: CreateCoffeeInput,
    @CurrentUser() user: UserPayload,
  ): Promise<CoffeePayload> {
    return this.coffeesService.createCoffee(data, user.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Query(() => [CoffeePayload])
  async getCoffees() {
    return this.coffeesService.getCoffees();
  }

  @Query(() => CoffeePayload)
  async getCoffee(@Args('slug') slug: string) {
    return this.coffeesService.getCoffeeBySlug(slug);
  }

  @Query(() => [String])
  async getFilterableAttributes(@Args() args: GetFilterableAttributesArgs) {
    return this.coffeesService.getFilterableAttributes(args);
  }

  @Query(() => [CoffeePayload])
  async getFilteredCoffees(@Args() args: GetFilteredCoffeesArgs) {
    return this.coffeesService.getFilteredCoffees(args);
  }

  @ResolveField(() => CoffeePayload)
  async coffee(@Parent() coffee: CoffeePayload) {
    return this.coffeesService.getCoffeeById(coffee.id);
  }

  @ResolveField(() => [JobPayload])
  async jobs(@Parent() coffee: CoffeePayload) {
    return this.jobsService.getJobsByCoffeeId(coffee.id);
  }
}
