import { Prisma } from '@prisma/client';
import { IsOptional, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryWhereInput } from './CategoryWhereInput';

export class CategoryFindManyArgs implements Prisma.CategoryFindManyArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryWhereInput)
  where?: Prisma.CategoryWhereInput;

  @IsOptional()
  @IsInt()
  @Min(1)
  take?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;
}
