import { Injectable } from '@nestjs/common';
import { PrismaClient, Product, User, Vendor } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { AddProductDto } from './dto/add-product.dto';
import { RemoveProductDto } from './dto/remove-product.dto';
import { EditProductDto } from './dto/edit-product.dto';

@Injectable()
export class VendorService {
  constructor(private prisma: PrismaClient) {}

  async createVendor(createVendorDto: CreateVendorDto) {
    try {
      const user = await this.checkifvendor(createVendorDto.email);
      console.log(user);
      if (user.isVendor) {
        throw new Error('User is already a vendor');
      }

      const newVendor = await this.prisma.vendor.create({
        data: {
          ...createVendorDto,
          user_id: user.id,
        },
      });
      await this.prisma.user.update({
        where: {
          email: createVendorDto.email,
        },
        data: {
          isVendor: true,
        },
      });
      return newVendor;
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkifvendor(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user.isVendor) {
        return user;
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(addProductDto: AddProductDto) {
    try {
      console.log(addProductDto);
      const vendor = await this.getVendorDetails(addProductDto.email);
      console.log(vendor);
      if (!vendor) {
        throw new Error('User is not a vendor');
      }
      const product = await this.prisma.product.create({
        data: {
          price: addProductDto.price,
          name: addProductDto.name,
          description: addProductDto.description,
          stock: addProductDto.stock,
          vendor_id: vendor.id,
          ProductImage: {
            create: addProductDto.images.map((image) => ({
              image_url: image.image_url,
              width: image.width,
              height: image.height,
            })),
          },
        },
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getVendorDetails(email: string): Promise<Vendor> {
    try {
      const vendor = await this.prisma.vendor.findUnique({
        where: {
          email: email,
        },
      });
      console.log(vendor);
      return vendor;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProduct(removeProductDto: RemoveProductDto) {
    try {
      const vendor = await this.getVendorDetails(removeProductDto.email);
      if (!vendor) {
        throw new Error('User is not a vendor');
      }
      const product = await this.prisma.product.delete({
        where: {
          id: removeProductDto.id,
        },
      });
      await this.prisma.productImage.deleteMany({
        where: {
          product_id: removeProductDto.id,
        },
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getVendorProducts(email: string): Promise<Product[]> {
    try {
      const vendor = await this.getVendorDetails(email);
      if (!vendor) {
        throw new Error('User is not a vendor');
      }
      const products = await this.prisma.product.findMany({
        where: {
          vendor_id: vendor.id,
        },
        include: {
          ProductImage: true,
        },
      });
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editProduct(id: number, editProductDto: EditProductDto) {
    try {
      const vendor = await this.getVendorDetails(editProductDto.email);
      if (!vendor) {
        throw new Error('User is not a vendor');
      }
      const product = await this.prisma.product.update({
        where: {
          id: id,
        },
        data: {
          price: editProductDto.price,
          name: editProductDto.name,
          description: editProductDto.description,
          stock: editProductDto.stock,
          ProductImage: {
            create: editProductDto.images.map((image) => ({
              image_url: image.image_url,
              width: image.width,
              height: image.height,
            })),
          },
        },
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
}
