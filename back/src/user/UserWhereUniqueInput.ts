import { IsString } from 'class-validator';

export class UserWhereUniqueInput {
  @IsString()
  id!: string;
}
