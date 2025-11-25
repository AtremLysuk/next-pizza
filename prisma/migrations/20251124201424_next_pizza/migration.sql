/*
  Warnings:

  - Made the column `address` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fullName` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "token" SET NOT NULL;
