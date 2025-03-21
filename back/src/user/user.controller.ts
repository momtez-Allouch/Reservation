import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { UserFindManyArgs } from './UserFindManyArgs';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMany(@Req() request: Request) {
    const args = plainToClass(UserFindManyArgs, request.query);

    return this.userService.findMany(args);
  }
}
