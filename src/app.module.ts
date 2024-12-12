import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OfficeModule } from './office/office.module';
import { EntryModule } from './entry/entry.module';
import { ExitModule } from './exit/exit.module';
import { LoanModule } from './loan/loan.module';
import { ReturnModule } from './return/return.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, ProductModule, OfficeModule, EntryModule, ExitModule, LoanModule, ReturnModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
