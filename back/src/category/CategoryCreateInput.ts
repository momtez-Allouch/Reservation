import { IsString, IsOptional } from 'class-validator';

export class CategoryCreateInput {
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
