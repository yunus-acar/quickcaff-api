import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TemperatureEnum } from '../enums/temperature.enum';

@ArgsType()
export class GetFilteredCoffeesArgs {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  density: string;

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  flavors: string[];

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty({ each: true })
  others?: string[];

  @Field(() => [String])
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  pairing_suggestions: string[];

  @Field(() => TemperatureEnum)
  @IsNotEmpty()
  @IsEnum(TemperatureEnum)
  temperature: TemperatureEnum;
}
