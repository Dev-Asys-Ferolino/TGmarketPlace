import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, PrismaClient],
})
export class CustomerModule {}
