/*
  Warnings:

  - A unique constraint covering the columns `[resetCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetCode" VARCHAR(20),
ADD COLUMN     "resetCodeExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_resetCode_key" ON "User"("resetCode");
