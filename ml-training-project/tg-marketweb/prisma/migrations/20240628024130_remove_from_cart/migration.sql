/*
  Warnings:

  - You are about to drop the column `cartId` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_cartId_fkey";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "cartId";
