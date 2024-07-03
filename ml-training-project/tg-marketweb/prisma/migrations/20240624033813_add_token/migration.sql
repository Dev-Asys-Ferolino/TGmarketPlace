/*
  Warnings:

  - Added the required column `hashtoken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashtoken" VARCHAR(120) NOT NULL,
ADD COLUMN     "refresh" VARCHAR(120) NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
