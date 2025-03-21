import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { Prisma, Reservation } from '@prisma/client';
import { PaginatedInterface } from 'src/util/PaginatedInterface';

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async create<T extends Prisma.ReservationCreateInput>(
    reservationData: Prisma.SelectSubset<T, Prisma.ReservationCreateInput>,
  ): Promise<Reservation | null> {
    return this.prisma.reservation.create({ data: reservationData });
  }

  async findMany<T extends Prisma.ReservationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationFindManyArgs>,
  ): Promise<PaginatedInterface<any>> {
    //Reservation   todo
    const [data, totalCount] = await Promise.all([
      this.prisma.reservation.findMany(args),
      this.prisma.reservation.count({ where: { deletedAt: null } }),
    ]);

    return { paginatedResult: data, totalCount };
  }

  async findOne<T extends Prisma.ReservationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ReservationFindUniqueArgs>,
  ): Promise<Reservation | null> {
    return await this.prisma.reservation.findUnique(args);
  }
}
