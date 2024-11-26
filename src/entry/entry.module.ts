import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { EntryController } from './entry.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EntryController],
  providers: [EntryService],
  imports: [PrismaModule],
})
export class EntryModule {}
