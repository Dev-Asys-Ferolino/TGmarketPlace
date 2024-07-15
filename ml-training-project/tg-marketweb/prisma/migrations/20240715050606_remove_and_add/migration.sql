/*
  Warnings:

  - You are about to drop the column `productimage_id` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productimage_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productimage_id";

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "orderitem_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_orderitem_id_fkey" FOREIGN KEY ("orderitem_id") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
