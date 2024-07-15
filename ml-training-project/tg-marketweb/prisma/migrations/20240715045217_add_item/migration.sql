/*
  Warnings:

  - You are about to drop the column `orderitem_id` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_orderitem_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productimage_id" INTEGER;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "orderitem_id";

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productimage_id_fkey" FOREIGN KEY ("productimage_id") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
