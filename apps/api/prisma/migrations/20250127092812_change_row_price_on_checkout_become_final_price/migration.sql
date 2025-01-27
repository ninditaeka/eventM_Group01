/*
  Warnings:

  - You are about to drop the column `price` on the `checkouts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "checkouts" DROP COLUMN "price",
ADD COLUMN     "final_price" INTEGER;
