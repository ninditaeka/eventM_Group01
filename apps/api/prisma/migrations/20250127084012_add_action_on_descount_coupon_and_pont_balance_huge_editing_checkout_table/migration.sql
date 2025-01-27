/*
  Warnings:

  - You are about to drop the column `discount_couponId` on the `checkouts` table. All the data in the column will be lost.
  - You are about to drop the column `point_balancesId` on the `checkouts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "checkouts" DROP CONSTRAINT "checkouts_discount_couponId_fkey";

-- DropForeignKey
ALTER TABLE "checkouts" DROP CONSTRAINT "checkouts_point_balancesId_fkey";

-- AlterTable
ALTER TABLE "checkouts" DROP COLUMN "discount_couponId",
DROP COLUMN "point_balancesId",
ADD COLUMN     "discount_coupon_use" INTEGER,
ADD COLUMN     "point_balance_use" INTEGER;

-- AlterTable
ALTER TABLE "discount_coupons" ADD COLUMN     "action" VARCHAR(50);

-- AlterTable
ALTER TABLE "point_balances" ADD COLUMN     "action" VARCHAR(50);
