import { Prisma } from '@prisma/client';
import { IsOptional, ValidateNested } from 'class-validator';
import { CategoryWhereUniqueInput } from './CategoryWhereUniqueInput';
import { Type } from 'class-transformer';

export class CategoryFindUniqueArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryWhereUniqueInput)
  where?: Prisma.CategoryWhereUniqueInput;
}
