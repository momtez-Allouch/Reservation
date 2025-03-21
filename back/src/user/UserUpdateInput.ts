import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UserUpdateInput implements Prisma.UserUpdateInput {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  deletedAt?: Date | null;
}
