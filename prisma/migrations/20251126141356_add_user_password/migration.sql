/*
  Warnings:

  - You are about to drop the column `userId` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phoneVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `VerificationCode` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `VerificationCode` table. All the data in the column will be lost.
  - You are about to drop the `Pizza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PizzaIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductIngredients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `items` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Pizza" DROP CONSTRAINT "Pizza_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PizzaIngredients" DROP CONSTRAINT "_PizzaIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_PizzaIngredients" DROP CONSTRAINT "_PizzaIngredients_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ProductIngredients" DROP CONSTRAINT "_ProductIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ProductIngredients" DROP CONSTRAINT "_ProductIngredients_B_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "userId",
ALTER COLUMN "quantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cartId",
ADD COLUMN     "items" JSONB NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phoneVerified",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verified" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "VerificationCode" DROP COLUMN "expiresAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "public"."Pizza";

-- DropTable
DROP TABLE "public"."_PizzaIngredients";

-- DropTable
DROP TABLE "public"."_ProductIngredients";

-- CreateTable
CREATE TABLE "_IngredientToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_IngredientToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_IngredientToProduct_B_index" ON "_IngredientToProduct"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToProduct" ADD CONSTRAINT "_IngredientToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToProduct" ADD CONSTRAINT "_IngredientToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
