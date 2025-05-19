import { IsString } from 'class-validator';

export class CategoryWhereUniqueInput {
  @IsString()
  id!: string;
}
