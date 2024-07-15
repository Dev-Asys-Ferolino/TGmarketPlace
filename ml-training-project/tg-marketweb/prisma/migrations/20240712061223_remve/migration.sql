/*
  Warnings:

  - You are about to drop the column `product_id` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_product_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "product_id";
