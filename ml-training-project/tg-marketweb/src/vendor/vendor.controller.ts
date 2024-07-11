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
import { Product } from '@prisma/client';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('add-product')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination:
          'C://Users//Fero20248225//Documents//GitHub//TGmarketPlace//tgmarketplace/public/uploads/images',
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
    return await this.vendorService.addProduct(addProductDto, image);
  }

  @Delete('remove-product')
  async removeProduct(@Body() removeProductDto: RemoveProductDto) {
    console.log(removeProductDto);
    return await this.vendorService.removeProduct(removeProductDto);
  }

  @Put('edit-product/:id')
  async editProduct(
    @Param('id') id: number,
    @Body() editProductDto: EditProductDto,
  ) {
    console.log(editProductDto);
    return await this.vendorService.editProduct(id, editProductDto);
  }

  @Get('get-vendor-products/:email')
  async getVendorProducts(@Param('email') email: string) {
    const products = await this.vendorService.getVendorProducts(email);
    return products;
  }
}
