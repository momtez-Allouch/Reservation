import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PrismaService } from 'src/prisma.service/prisma.service';

@Module({
  providers: [ReservationService, PrismaService],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
