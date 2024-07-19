import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class GetCoffeesArgs {
  @IsNumber()
  @IsOptional()
  jobId?: number;

  @IsObject()
  join?: {
    job?: boolean;
  };
}
