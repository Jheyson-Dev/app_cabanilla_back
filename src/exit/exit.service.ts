import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExitDto } from './dto/create-exit.dto';
import { UpdateExitDto } from './dto/update-exit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryDto } from 'src/entry/dto/inventory.dto';

@Injectable()
export class ExitService {
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

      if (!inventory) {
        throw new BadRequestException(`Inventory not found`);
      }

      if (!product) {
        throw new BadRequestException(`Product not found`);
      }

      await this.prismaService.officeProduct.update({
        where: { id: inventory.id },
        data: {
          stock: {
            decrement: inventoryDto.quantity,
          },
        },
      });

      const exit = await this.prismaService.exit.create({
        data: {
          officeProductId: inventory.id,
          quantity: inventoryDto.quantity,
          observation: inventoryDto.observation,
        },
      });
      return exit;
    } catch (err) {
      throw new BadRequestException(`Error creating exit: ${err.message}`);
    }
  }

  findAll() {
    return this.prismaService.exit.findMany({
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
    return `This action returns a #${id} exit`;
  }

  update(id: number, updateExitDto: UpdateExitDto) {
    return `This action updates a #${id} exit`;
  }

  remove(id: number) {
    return `This action removes a #${id} exit`;
  }
}
