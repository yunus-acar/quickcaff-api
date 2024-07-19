import { Field, ObjectType } from '@nestjs/graphql';
import { BasePayload } from 'src/shared/graphql/base.payload';
import { TemperatureEnum } from '../enums/temperature.enum';

@ObjectType()
export class CoffeePayload extends BasePayload {
  @Field(() => String)
  image: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  density: string;

  @Field(() => [String])
  flavors: string[];

  @Field(() => [String])
  others: string[];

  @Field(() => String)
  description: string;

  @Field(() => String)
  origin: string;

  @Field(() => TemperatureEnum)
  serving_temperature: TemperatureEnum;

  @Field(() => TemperatureEnum)
  temperature: TemperatureEnum;

  @Field(() => [String])
  pairing_suggestions: string[];

  @Field(() => String)
  caffeine_content: string;

  @Field(() => [String])
  variations: string[];

  @Field(() => String)
  history: string;
}
