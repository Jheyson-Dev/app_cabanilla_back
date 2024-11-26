import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          username: createUserDto.dni,
          password: bcrypt.hashSync(createUserDto.dni, 10),
        },
      });
      return user;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException({
          message: `Error creating user: DNI ${createUserDto.dni} already exists`,
          status: 400,
        });
      }
      throw new BadRequestException({
        message: `Error creating user: ${err.message}`,
        status: 400,
        error: `${JSON.stringify(err)}`,
      });
    }
  }

  findAll() {
    // try {
    const users = this.prismaService.user.findMany();
    return users;
    // } catch (err) {
    // throw new BadRequestException({
    // message: `Error getting users: ${err.message}`,
    // status: 400,
    // });
    // }
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prismaService.user.update({
      where: { id },
      data: { status: false },
    });
  }
}
