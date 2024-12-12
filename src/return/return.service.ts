import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryDto } from 'src/entry/dto/inventory.dto';

@Injectable()
export class ReturnService {
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
            increment: inventoryDto.quantity,
          },
        },
      });

      const entry = await this.prismaService.return.create({
        data: {
          officeProductId: inventory.id,
          quantity: inventoryDto.quantity,
          observation: inventoryDto.observation,
        },
      });
      return entry;
    } catch (err) {
      throw new BadRequestException(`Error creating entry: ${err.message}`);
    }
  }

  findAll() {
    return this.prismaService.return.findMany({
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
    return `This action returns a #${id} return`;
  }

  update(id: number, updateReturnDto: UpdateReturnDto) {
    return `This action updates a #${id} return`;
  }

  remove(id: number) {
    return `This action removes a #${id} return`;
  }
}
