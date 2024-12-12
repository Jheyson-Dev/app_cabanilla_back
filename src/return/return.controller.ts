import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { InventoryDto } from 'src/entry/dto/inventory.dto';

@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) {}

  @Post()
  create(@Body() inventoryDto: InventoryDto) {
    return this.returnService.create(inventoryDto);
  }

  @Get()
  findAll() {
    return this.returnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturnDto: UpdateReturnDto) {
    return this.returnService.update(+id, updateReturnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returnService.remove(+id);
  }
}
