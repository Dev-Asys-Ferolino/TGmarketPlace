import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [VendorController],
  providers: [
    VendorService,
    PrismaService,
    PrismaClient,
    JwtService,
    UsersService,
    AuthService,
  ],
})
export class VendorModule {}
