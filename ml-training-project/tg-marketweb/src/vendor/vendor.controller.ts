import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { AddProductDto } from './dto/add-product.dto';
import { RemoveProductDto } from './dto/remove-product.dto';
import { EditProductDto } from './dto/edit-product.dto';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('add-product')
  async addProduct(@Body() addProductDto: AddProductDto) {
    console.log(addProductDto);
    return await this.vendorService.addProduct(addProductDto);
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
}
