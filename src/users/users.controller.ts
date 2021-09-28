import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './interfaces/create-user.dto';

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  findMe(@Request() req): Promise<User> {
    return this.usersService.findOne(req.user.userId);
  }

  @Get(':id')
  findOne(@Param() params): Promise<User> {
    return this.usersService.findOne(params.id);
  }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
