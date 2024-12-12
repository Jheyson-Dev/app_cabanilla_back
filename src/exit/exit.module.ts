import { Module } from '@nestjs/common';
import { ExitService } from './exit.service';
import { ExitController } from './exit.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExitController],
  providers: [ExitService],
  imports: [PrismaModule],
})
export class ExitModule {}
