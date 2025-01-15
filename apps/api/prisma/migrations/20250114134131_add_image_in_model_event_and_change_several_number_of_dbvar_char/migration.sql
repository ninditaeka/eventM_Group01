/*
  Warnings:

  - Added the required column `image` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "image" VARCHAR(50) NOT NULL,
ALTER COLUMN "location" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "event_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(50);
