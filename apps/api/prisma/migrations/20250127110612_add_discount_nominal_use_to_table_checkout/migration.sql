/*
  Warnings:

  - You are about to drop the column `final_price` on the `checkouts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "checkouts" DROP COLUMN "final_price",
ADD COLUMN     "discount_nominal_use" INTEGER,
ADD COLUMN     "price" INTEGER;
