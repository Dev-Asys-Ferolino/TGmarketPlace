import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-to-cart.dto';
import { CheckOutOrderDto } from './dto/check-out-order.dto';
import { Cart, User } from '@prisma/client';
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
    try {
      const cart = await this.customerService.getCart(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  @Post('view-cart')
  async viewCart(@Body() id: number) {
    return await this.customerService.viewCart(id);
  }
  @Get('get-cart-by-id/:id')
  async getCartById(@Param('id') id: number) {
    return await this.customerService.getCartById(id);
  }
  @Post('checkout-order/:id')
  async checkoutOrder(
    @Param('id') id: number,
    @Body() checkoutOrder: CheckOutOrderDto,
  ) {
    return await this.customerService.checkoutOrder(id, checkoutOrder);
  }
  @Get('view-order/:id')
  async viewOrder(@Param('id') id: number) {
    return await this.customerService.viewOrder(id);
  }

  @Get('get-total-unpaid-orders/:id')
  async getTotalUnpaidOrders(@Param('id') id: number) {
    return await this.customerService.getTotalUnpaidOrders(id);
  }

  @Get('get-unpaid-orders/:id')
  async getUnpaidOrders(@Param('id') id: number) {
    return await this.customerService.getUnpaidOrders(id);
  }
}
