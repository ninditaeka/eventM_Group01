/*
  Warnings:

  - Made the column `total_transaction_discount` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "total_transaction_discount" SET NOT NULL;
