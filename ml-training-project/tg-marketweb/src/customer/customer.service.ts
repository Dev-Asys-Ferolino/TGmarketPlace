import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-to-cart.dto';
import { Cart, Order, Product } from '@prisma/client';
import { CheckOutOrderDto } from './dto/check-out-order.dto';
import { UserIdDto } from 'src/users/dto/userid-dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async addToCart(addToCartDto: AddToCartDto) {
    const { email, productId, quantity, price } = addToCartDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      await this.prisma.cart.create({
        data: {
          vendor_id: product.vendor_id,
          quantity: quantity,
          price: price,
          total: quantity * price,
          user_id: user.id,
          product_id: product.id,
        },
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeFromCart(id: number, addToCartDto: RemoveFromCartDto) {
    const { email, productId } = addToCartDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      const cart = await this.prisma.cart.findUnique({
        where: {
          id: id,
          user_id: user.id,
          product_id: productId,
        },
      });
      await this.prisma.cart.delete({
        where: {
          id: cart.id,
        },
      });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCart(id: number): Promise<Cart[]> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      const carts = await this.prisma.cart.findMany({
        where: {
          user_id: user.id,
        },
        include: {
          product: {
            include: {
              ProductImage: true,
            },
          },
        },
      });
      carts.forEach((cart) => {
        cart.product.ProductImage.forEach((image) => {
          cart.product.ProductImage.push(image);
        });
      });
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async viewCart(id: number): Promise<Cart> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id: id,
        },
      });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getCartById(id: number): Promise<Cart> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id: id,
        },
        include: {
          product: {
            include: {
              ProductImage: true,
            },
          },
          vendor: true,
        },
      });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
  async checkoutOrder(checkoutOrderDto: CheckOutOrderDto): Promise<Order> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: checkoutOrderDto.email,
        },
      });
      const carts = await this.prisma.cart.findMany({
        where: {
          user_id: user.id,
        },
      });
      if (carts.length === 0) {
        throw new Error('No carts found');
      }
      const order = await this.prisma.order.create({
        data: {
          user_id: user.id,
          vendor_id: carts[0].vendor_id,
          total: carts.reduce((acc, curr) => acc + +curr.total, 0),
          status: 'pending',
          delivery_status: 'pending',
          payment_method: 'cash',
          payment_status: 'pending',
          OrderItem: {
            create: carts.map((cart) => ({
              product_id: cart.product_id,
              quantity: cart.quantity,
              total: cart.total,
            })),
          },
        },
      });

      await this.prisma.product.updateMany({
        where: {
          id: {
            in: carts.map((cart) => cart.product_id),
          },
        },
        data: {
          stock: {
            decrement: carts.reduce((acc, curr) => acc + +curr.quantity, 0),
          },
        },
      });
      await this.prisma.cart.deleteMany({
        where: {
          user_id: user.id,
          product_id: {
            in: carts.map((cart) => cart.product_id),
          },
        },
      });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async viewOrder(useridDto: UserIdDto): Promise<Order> {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          id: useridDto.id,
        },
        include: {
          OrderItem: true,
        },
      });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany({
        where: {
          stock: { not: 0 },
        },
        include: {
          ProductImage: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTotalUnpaidOrders(id: number): Promise<Order[]> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      const orders = await this.prisma.order.findMany({
        where: {
          user_id: user.id,
          status: 'pending',
          payment_status: 'pending',
        },
      });
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }
}
