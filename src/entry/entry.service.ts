import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryDto } from './dto/inventory.dto';

@Injectable()
export class EntryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(inventoryDto: InventoryDto) {
    try {
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
        const createInventory = await this.prismaService.officeProduct.create({
          data: {
            officeId: inventoryDto.officeId,
            productId: inventoryDto.productId,
            stock: inventoryDto.quantity,
          },
        });
        const entry = await this.prismaService.entry.create({
          data: {
            officeProductId: createInventory.id,
            quantity: inventoryDto.quantity,
            observation: inventoryDto.observation,
          },
        });
        return entry;
      }

      await this.prismaService.officeProduct.update({
        where: { id: inventory.id },
        data: {
          stock: {
            increment: inventoryDto.quantity,
          },
        },
      });

      const entry = await this.prismaService.entry.create({
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
    return this.prismaService.entry.findMany();
  }

  findOne(id: string) {
    return this.prismaService.entry.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEntryDto: UpdateEntryDto) {
    return this.prismaService.entry.update({
      where: { id },
      data: updateEntryDto,
    });
  }

  remove(id: string) {
    return `Operation is not permitted`;
  }
}
