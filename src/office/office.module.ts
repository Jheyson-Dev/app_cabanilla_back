import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OfficeController],
  providers: [OfficeService],
  imports: [PrismaModule],
})
export class OfficeModule {}
