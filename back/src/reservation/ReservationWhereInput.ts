import { Prisma, BookingStatus } from '@prisma/client';
import { IsOptional, IsString, IsEnum, IsDate } from 'class-validator';

export class ReservationWhereInput implements Prisma.ReservationWhereInput {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsDate()
  date?: Date;
}
