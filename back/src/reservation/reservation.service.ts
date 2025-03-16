import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { Reservation } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }
}
