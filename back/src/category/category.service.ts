import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service/prisma.service';
import { Prisma, Category } from '@prisma/client';
import { PaginatedInterface } from 'src/util/PaginatedInterface';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create<T extends Prisma.CategoryCreateInput>(
    categoryData: Prisma.SelectSubset<T, Prisma.CategoryCreateInput>,
  ): Promise<Category | null> {
    return this.prisma.category.create({ data: categoryData });
  }

  async findMany<T extends Prisma.CategoryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.CategoryFindManyArgs>,
  ): Promise<PaginatedInterface<any>> {
    //Category   todo
    const [data, totalCount] = await Promise.all([
      this.prisma.category.findMany(args),
      this.prisma.category.count({ where: { deletedAt: null } }),
    ]);

    return { paginatedResult: data, totalCount };
  }

  async findOne<T extends Prisma.CategoryFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.CategoryFindUniqueArgs>,
  ): Promise<Category | null> {
    return await this.prisma.category.findUnique(args);
  }
}
