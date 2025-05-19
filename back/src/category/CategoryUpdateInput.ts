import { Prisma, BookingStatus } from '@prisma/client';
import { IsOptional, IsEnum, IsDate, IsString } from 'class-validator';

export class CategoryUpdateInput implements Prisma.CategoryUpdateInput {
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
