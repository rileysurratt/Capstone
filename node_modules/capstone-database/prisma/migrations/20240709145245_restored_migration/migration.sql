/*
  Warnings:

  - Made the column `quantity` on table `Cart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "quantity" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "address" SET NOT NULL;
