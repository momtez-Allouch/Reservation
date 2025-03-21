import { Prisma, BookingStatus } from '@prisma/client';
import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

export class ReservationCreateInput {
  @IsString()
  userId!: string;

  @IsDate()
  date!: Date;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus = BookingStatus.pending;
}
