/*
  Warnings:

  - You are about to drop the column `amount` on the `checkouts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "checkouts" DROP COLUMN "amount",
ADD COLUMN     "quantity" INTEGER;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "deleted_at" TIMESTAMP(3);
