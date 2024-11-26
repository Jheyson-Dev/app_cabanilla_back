import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OfficeService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createOfficeDto: CreateOfficeDto) {
    try {
      return this.prismaService.office.create({
        data: createOfficeDto,
      });
    } catch (err) {
      throw new BadRequestException(`Error creating office`);
    }
  }

  findAll() {
    return this.prismaService.office.findMany();
  }

  findOne(id: string) {
    return this.prismaService.office.findUnique({
      where: { id },
    });
  }

  update(id: string, updateOfficeDto: UpdateOfficeDto) {
    return this.prismaService.office.update({
      where: { id },
      data: updateOfficeDto,
    });
  }

  remove(id: string) {
    return `This action is not Permited`;
  }
}
