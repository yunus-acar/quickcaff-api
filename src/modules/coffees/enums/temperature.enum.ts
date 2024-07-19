import { registerEnumType } from '@nestjs/graphql';

export enum TemperatureEnum {
  ICED = 'iced',
  HOT = 'hot',
}

registerEnumType(TemperatureEnum, {
  name: 'Temperature',
  description: 'The temperature of the coffee',
});
