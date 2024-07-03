/*
  Warnings:

  - Added the required column `image_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "image_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "ProductImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
