import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    try {
      if (!createProductDto.description) {
        createProductDto.description = 'No description';
      }
      return this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (err) {
      throw new BadRequestException(`Error creating product`);
    }
  }

  findAll() {
    return this.prismaService.product.findMany({
      include: {
        OfficeProduct: {
          include: {
            Entry: true,
            Exit: true,
            Loan: true,
            Return: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        OfficeProduct: {
          include: {
            Entry: {
              include: {
                OfficeProduct: {
                  include: {
                    Office: true,
                  },
                },
              },
            },
            Exit: true,
            Loan: true,
            Return: true,
            Office: true,
            Product: true,
          },
        },
      },
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return `This action is not permited`;
  }
}
