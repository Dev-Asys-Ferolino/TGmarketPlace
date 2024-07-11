import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-to-cart.dto';
import { CheckOutOrderDto } from './dto/check-out-order.dto';
import { User } from '@prisma/client';
import { UserIdDto } from 'src/users/dto/userid-dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('add-to-cart')
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return await this.customerService.addToCart(addToCartDto);
  }
  @Delete('remove-from-cart')
  async removeFromCart(
    @Body()
    removeFromCartDto: RemoveFromCartDto,
  ) {
    return await this.customerService.removeFromCart(removeFromCartDto);
  }
  @Get('get-cart/:id')
  async getCart(@Param('id') id: number) {
    return await this.customerService.getCart(id);
  }
  @Post('view-cart')
  async viewCart(@Body() id: number) {
    return await this.customerService.viewCart(id);
  }
  @Get('get-cart-by-id/:id')
  async getCartById(@Param('id') id: number) {
    return await this.customerService.getCartById(id);
  }
  @Post('checkout-order')
  async checkoutOrder(@Body() checkoutOrderDto: CheckOutOrderDto) {
    return await this.customerService.checkoutOrder(checkoutOrderDto);
  }
  @Post('view-order')
  async viewOrder(@Body() id: UserIdDto) {
    return await this.customerService.viewOrder(id);
  }
}
