import { Prisma, BookingStatus } from '@prisma/client';
import { IsOptional, IsEnum, IsDate } from 'class-validator';

export class ReservationUpdateInput implements Prisma.ReservationUpdateInput {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  deletedAt?: Date | null;
}
