import { Prisma } from '@prisma/client';
import {
  IsOptional,
  IsInt,
  Min,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserWhereInput } from './UserWhereInput';

export class UserFindManyArgs implements Prisma.UserFindManyArgs {
  @IsOptional()
  @ValidateNested()
  @Type(() => UserWhereInput)
  where?: Prisma.UserWhereInput;

  @IsOptional()
  @IsInt()
  @Min(1)
  take?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;
}
