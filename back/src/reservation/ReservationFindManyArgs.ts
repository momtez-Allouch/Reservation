import { Prisma } from '@prisma/client';
import { IsOptional, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationWhereInput } from './ReservationWhereInput';

export class ReservationFindManyArgs implements Prisma.ReservationFindManyArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => ReservationWhereInput)
  where?: Prisma.ReservationWhereInput;

  @IsOptional()
  @IsInt()
  @Min(1)
  take?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;
}
