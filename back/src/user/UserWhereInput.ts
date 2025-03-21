import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UserWhereInput implements Prisma.UserWhereInput {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  deletedAt?: Date | null;
}
