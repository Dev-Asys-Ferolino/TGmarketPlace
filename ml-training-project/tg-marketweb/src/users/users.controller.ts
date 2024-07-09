import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import e from 'express';
import { Token } from './types/token';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { VendorService } from 'src/vendor/vendor.service';
import { CreateVendorDto } from 'src/vendor/dto/create-vendor.dto';
import { UserIdDto } from './dto/userid-dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly vendorService: VendorService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.usersService.findbyid(id);
  }

  @Post('register-vendor')
  async registerVendor(@Body() CreateVendorDto: CreateVendorDto) {
    const vendor = await this.vendorService.createVendor(CreateVendorDto);
    return vendor;
  }

  @Get('check-vendor/:id')
  async checkVendor(@Param('id') id: number) {
    const user = await this.usersService.getUserifVendor(id);
    return user;
  }
}
