import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GetTokenStrategy, RefreshTokenStrategy } from './strategies';
import { PrismaService } from 'src/prisma.service';
import { VendorService } from 'src/vendor/vendor.service';
import { PrismaClient } from '@prisma/client';
import { CustomerService } from 'src/customer/customer.service';
@Module({
  imports: [JwtModule.register({})],
  providers: [
    UsersService,
    GetTokenStrategy,
    PrismaService,
    JwtService,
    VendorService,
    PrismaService,
    PrismaClient,
    CustomerService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
