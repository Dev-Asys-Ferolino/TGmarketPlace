/*
  Warnings:

  - Added the required column `product_price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "product_price" DECIMAL(10,2) NOT NULL;
