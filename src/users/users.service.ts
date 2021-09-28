import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './interfaces/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userToSave = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return await this.usersRepository.save(userToSave);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
