/*
  Warnings:

  - You are about to drop the column `max_voucher_discount` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "max_voucher_discount",
ADD COLUMN     "total_seat" INTEGER,
ADD COLUMN     "total_transaction_discount" INTEGER;
