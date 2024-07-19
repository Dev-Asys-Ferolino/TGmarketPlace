import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { AddProductDto } from './dto/add-product.dto';
import { RemoveProductDto } from './dto/remove-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Order, Product } from '@prisma/client';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('add-product')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination:
          'C://Users//Desu19017174//Documents//GitHub//TGmarketPlace//tgmarketplace/public/uploads/images',
        filename: (req, file, callback) => {
          const ext = file.mimetype.split('/')[1];
          const filename = `${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addProduct(
    @Body() addProductDto: AddProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Product> {
    try {
      console.log(addProductDto);
      const product = await this.vendorService.addProduct(addProductDto, image);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete('remove-product')
  async removeProduct(@Body() removeProductDto: RemoveProductDto) {
    try {
      console.log(removeProductDto);
      const product = await this.vendorService.removeProduct(removeProductDto);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('edit-product/:id')
  async editProduct(
    @Param('id') id: number,
    @Body() editProductDto: EditProductDto,
  ) {
    console.log(editProductDto);
    try {
      const product = await this.vendorService.editProduct(id, editProductDto);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('get-vendor-products/:email')
  async getVendorProducts(@Param('email') email: string) {
    try {
      const products = await this.vendorService.getVendorProducts(email);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('view-order-as-vendor/:id')
  async viewOrderasvendor(@Param('id') id: number): Promise<Order[]> {
    try {
      const order = await this.vendorService.viewOrderasvendor(id);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('get-unpaid-orders/:email')
  async getUnpaidOrders(@Param('email') email: string): Promise<Order[]> {
    try {
      const orders = await this.vendorService.getUnpaidOrders(email);
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('update-paid-orders/:id')
  async updatePaidOrders(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.vendorService.updatePaidOrders(
        id,
        updateOrderDto,
      );
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('update-delivered-orders/:id')
  async updateDeliveredOrders(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const order = await this.vendorService.updateDeliveredOrders(
        id,
        updateOrderDto,
      );
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
}
