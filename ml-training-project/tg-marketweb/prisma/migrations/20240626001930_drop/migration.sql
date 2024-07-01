/*
  Warnings:

  - You are about to drop the column `hashtoken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refresh` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashtoken",
DROP COLUMN "refresh",
ALTER COLUMN "password" SET DATA TYPE VARCHAR(200);
