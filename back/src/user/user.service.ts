import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PaginatedInterface } from 'src/util/PaginatedInterface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create<T extends Prisma.UserCreateInput>(
    userData: Prisma.SelectSubset<T, Prisma.UserCreateInput>,
  ): Promise<User | null> {
    return this.prisma.user.create({ data: userData });
  }

  async findMany<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
  ): Promise<PaginatedInterface<any>> {
    //User   todo
    const [data, totalCount] = await Promise.all([
      this.prisma.user.findMany(args),
      this.prisma.user.count({ where: { deletedAt: null } }),
    ]);

    return { paginatedResult: data, totalCount };
  }

  async findOne<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ): Promise<User | null> {
    return await this.prisma.user.findUnique(args);
  }
}
