import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OfficeModule } from './office/office.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, ProductModule, OfficeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
