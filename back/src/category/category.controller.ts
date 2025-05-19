import { Controller, Get, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryFindManyArgs } from './CategoryFindManyArgs';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findMany(@Req() request: Request) {
    const args = plainToClass(CategoryFindManyArgs, request.query);

    return this.categoryService.findMany({
      ...args,
      select: {
        id: true,
        name: true,
        products: true,
      },
    });
  }
}
