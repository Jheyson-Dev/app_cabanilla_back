import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntryService } from './entry.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InventoryDto } from './dto/inventory.dto';

@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  create(@Body() inventoryDto: InventoryDto) {
    return this.entryService.create(inventoryDto);
  }

  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) {
    return this.entryService.update(id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entryService.remove(id);
  }
}
