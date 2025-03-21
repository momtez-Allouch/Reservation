import { Prisma } from '@prisma/client';
import { IsOptional, ValidateNested } from 'class-validator';
import { UserWhereUniqueInput } from './UserWhereUniqueInput';
import { Type } from 'class-transformer';

export class UserFindUniqueArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => UserWhereUniqueInput)
  where?: Prisma.UserWhereUniqueInput;
}
