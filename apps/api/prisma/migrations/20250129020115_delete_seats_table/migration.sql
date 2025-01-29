/*
  Warnings:

  - You are about to drop the `seats` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `price` on table `checkouts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_checkoutId_fkey";

-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_eventId_fkey";

-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_userId_fkey";

-- AlterTable
ALTER TABLE "checkouts" ALTER COLUMN "price" SET NOT NULL;

-- DropTable
DROP TABLE "seats";
