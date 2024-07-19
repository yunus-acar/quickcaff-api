import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TemperatureEnum } from '../enums/temperature.enum';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@InputType()
export class CreateCoffeeInput {
  @Field(() => GraphQLUpload)
  image: Promise<Upload>;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  density: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  flavors: string[];

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  others: string[];

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  origin: string;

  @Field(() => TemperatureEnum)
  serving_temperature: TemperatureEnum;

  @Field(() => TemperatureEnum)
  temperature: TemperatureEnum;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  caffeine_content: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  pairing_suggestions: string[];

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  history: string;

  @Field(() => [Number], { nullable: true })
  @IsArray()
  @IsOptional()
  jobIds?: number[];

  @IsNumber()
  @IsOptional()
  createdById?: number;

  @Field({ nullable: true })
  imagePath?: string;
}
