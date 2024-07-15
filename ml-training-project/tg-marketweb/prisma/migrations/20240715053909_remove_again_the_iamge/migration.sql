/*
  Warnings:

  - You are about to drop the column `order_id` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `productimage_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "productimage_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "order_id";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productimage_id_fkey" FOREIGN KEY ("productimage_id") REFERENCES "ProductImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
