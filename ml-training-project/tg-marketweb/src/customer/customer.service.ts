import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RemoveFromCartDto } from './dto/remove-to-cart.dto';
import { Cart, Order, Product, User } from '@prisma/client';
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
      console.log(product.stock);
      if (product.stock < quantity) {
        throw new Error('Out of stock');
      }
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

  async removeFromCart(addToCartDto: RemoveFromCartDto) {
    const { productId } = addToCartDto;
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id: productId,
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
  async checkoutOrder(
    id: number,
    checkoutOrder: CheckOutOrderDto,
  ): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      console.log(checkoutOrder.selectItems.length);
      if (checkoutOrder.selectItems.length === 0) {
        throw new Error('Please select at least one item');
      }

      for (let i = 0; i < checkoutOrder.selectItems.length; i++) {
        const item = checkoutOrder.selectItems[i];
        await this.prisma.cart.update({
          where: {
            id: item.id,
          },
          data: {
            quantity: item.quantity,
          },
        });
        console.log('this is item', item);
        await this.createOrderAndModifyProduct(item, user);
        await this.deleteUserCartItems(item, user);
      }

      return 'Order placed successfully';
    } catch (error) {
      throw new Error(error);
    }
  }
  private async createOrderAndModifyProduct(item: Cart, user: User) {
    console.log('this is item', item);
    const vendor = await this.prisma.cart.findUnique({
      where: {
        id: item.id,
      },
    });
    const product = await this.prisma.product.findUnique({
      where: {
        id: item.product_id,
      },
      include: {
        ProductImage: true,
      },
    });

    if (product.stock < item.quantity) {
      throw new Error('Out of stock');
    }
    await this.prisma.order.create({
      data: {
        user_id: user.id,
        productimage_id: product.ProductImage[0].id,
        vendor_id: vendor.vendor_id,
        total: item.total,
        status: 'pending',
        delivery_status: 'pending',
        payment_method: 'cash',
        payment_status: 'pending',
        OrderItem: {
          create: [
            {
              product_price: product.price,
              product_name: product.name,
              product_id: item.product_id,
              quantity: item.quantity,
              total: item.total,
            },
          ],
        },
      },
    });

    await this.prisma.product.updateMany({
      where: {
        id: {
          in: [item.product_id],
        },
      },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  private async deleteUserCartItems(item: Cart, user: User) {
    const id = item.id;
    console.log(id);
    await this.prisma.cart.deleteMany({
      where: {
        user_id: user.id,
        id: {
          in: [id],
        },
      },
    });
  }

  async viewOrder(id: number): Promise<Order[]> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          Order: {
            include: {
              OrderItem: true,
              productimage: true,
            },
          },
        },
      });
      const order = user.Order;

      order.sort((a, b) => {
        if (a.payment_status === 'pending' && b.payment_status !== 'pending') {
          return -1; // a comes before b
        } else if (
          a.payment_status !== 'pending' &&
          b.payment_status === 'pending'
        ) {
          return 1; // b comes before a
        } else {
          return 0; // no change in order
        }
      });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUnpaidOrders(id: number): Promise<Order[]> {
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
        include: {
          OrderItem: true,
          productimage: true,
        },
      });
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }

  async searchProduct(search: string): Promise<Product[]> {
    try {
      console.log(search);
      const products = await this.prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
        include: {
          ProductImage: true,
        },
      });
      console.log(products);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
}
