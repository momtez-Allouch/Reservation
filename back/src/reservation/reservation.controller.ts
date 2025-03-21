import { Controller, Get, Req } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationFindManyArgs } from './ReservationFindManyArgs';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  findMany(@Req() request: Request) {
    const args = plainToClass(ReservationFindManyArgs, request.query);

    return this.reservationService.findMany(args);
  }
}
