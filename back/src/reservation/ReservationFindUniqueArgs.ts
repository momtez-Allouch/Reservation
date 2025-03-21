import { Prisma } from '@prisma/client';
import { IsOptional, ValidateNested } from 'class-validator';
import { ReservationWhereUniqueInput } from './ReservationWhereUniqueInput';
import { Type } from 'class-transformer';

export class ReservationFindUniqueArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => ReservationWhereUniqueInput)
  where?: Prisma.ReservationWhereUniqueInput;
}
