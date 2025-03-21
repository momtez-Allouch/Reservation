import { IsString } from 'class-validator';

export class ReservationWhereUniqueInput {
  @IsString()
  id!: string;
}
