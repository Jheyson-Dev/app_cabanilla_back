import { Module } from '@nestjs/common';
import { ReturnService } from './return.service';
import { ReturnController } from './return.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ReturnController],
  providers: [ReturnService],
  imports: [PrismaModule],
})
export class ReturnModule {}
