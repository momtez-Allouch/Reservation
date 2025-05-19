import { Prisma, BookingStatus } from '@prisma/client';
import { IsOptional, IsString, IsEnum, IsDate } from 'class-validator';

export class CategoryWhereInput implements Prisma.CategoryWhereInput {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
