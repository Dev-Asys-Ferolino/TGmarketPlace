import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-to-cart.dto';
import { CheckOutOrderDto } from './dto/check-out-order.dto';
import { Cart, Order, Product, User } from '@prisma/client';
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
    try {
      const cart = await this.customerService.removeFromCart(removeFromCartDto);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
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
    try {
      const cart = await this.customerService.viewCart(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  @Get('get-cart-by-id/:id')
  async getCartById(@Param('id') id: number) {
    try {
      const cart = await this.customerService.getCartById(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  @Post('checkout-order/:id')
  async checkoutOrder(
    @Param('id') id: number,
    @Body() checkoutOrder: CheckOutOrderDto,
  ) {
    try {
      const order = await this.customerService.checkoutOrder(id, checkoutOrder);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
  @Get('view-order/:id')
  async viewOrder(@Param('id') id: number) {
    try {
      const order = await this.customerService.viewOrder(id);
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('get-unpaid-orders/:id')
  async getUnpaidOrders(@Param('id') id: number): Promise<Order[]> {
    try {
      const orders = await this.customerService.getUnpaidOrders(id);
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('search-product/:search')
  async searchProduct(@Param('search') search: string): Promise<Product[]> {
    try {
      const products = await this.customerService.searchProduct(search);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
}
