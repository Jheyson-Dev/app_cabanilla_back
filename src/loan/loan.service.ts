import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InventoryDto } from 'src/entry/dto/inventory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoanService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(inventoryDto: InventoryDto) {
    try {
      // Si no viene la observacion
      if (!inventoryDto.observation) {
        inventoryDto.observation = 'No observation';
      }

      // Verificamos si existe la relacion
      const inventory = await this.prismaService.officeProduct.findFirst({
        where: {
          officeId: inventoryDto.officeId,
          productId: inventoryDto.productId,
        },
      });

      // Verificamos si el producto y oficina existen
      const office = await this.prismaService.office.findUnique({
        where: {
          id: inventoryDto.officeId,
        },
      });
      if (!office) {
        throw new BadRequestException(`Office not found`);
      }

      const product = await this.prismaService.product.findUnique({
        where: {
          id: inventoryDto.productId,
        },
      });
      if (!product) {
        throw new BadRequestException(`Product not found`);
      }

      if (!inventory) {
        throw new BadRequestException(`Inventory not found`);
      }

      await this.prismaService.officeProduct.update({
        where: { id: inventory.id },
        data: {
          stock: {
            decrement: inventoryDto.quantity,
          },
        },
      });

      const loan = await this.prismaService.loan.create({
        data: {
          officeProductId: inventory.id,
          quantity: inventoryDto.quantity,
          observation: inventoryDto.observation,
        },
      });
      return loan;
    } catch (err) {
      throw new BadRequestException(`Error creating entry: ${err.message}`);
    }
  }

  findAll() {
    return this.prismaService.loan.findMany({
      include: {
        OfficeProduct: {
          include: {
            Office: true,
            Product: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
