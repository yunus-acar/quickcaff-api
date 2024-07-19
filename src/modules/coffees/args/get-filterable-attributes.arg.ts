import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TemperatureEnum } from '../enums/temperature.enum';

@ArgsType()
export class GetFilterableAttributesArgs {
  @Field(() => String)
  key: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  density?: string;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty({ each: true })
  flavors?: string[];

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty({ each: true })
  others?: string[];

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  @IsNotEmpty({ each: true })
  pairing_suggestions?: string[];

  @Field(() => TemperatureEnum, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TemperatureEnum)
  temperature?: TemperatureEnum;
}
