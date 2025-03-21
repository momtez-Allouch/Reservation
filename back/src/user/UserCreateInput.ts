import { Prisma } from '@prisma/client';
import { IsString, IsOptional } from 'class-validator';

export class UserCreateInput implements Prisma.UserCreateInput {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsString()
  password!: string;
}
