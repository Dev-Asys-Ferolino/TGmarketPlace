/*
  Warnings:

  - You are about to drop the column `cart_id` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_cart_id_fkey";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "cart_id",
ADD COLUMN     "cartId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
