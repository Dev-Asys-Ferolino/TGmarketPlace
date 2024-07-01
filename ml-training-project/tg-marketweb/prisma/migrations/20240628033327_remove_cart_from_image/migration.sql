/*
  Warnings:

  - You are about to drop the column `image_id` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_image_id_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "image_id";
