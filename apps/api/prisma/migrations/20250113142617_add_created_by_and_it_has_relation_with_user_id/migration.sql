/*
  Warnings:

  - You are about to drop the column `limit_person_voucher_discount` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `events` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_voucher_discount` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_user_id_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "limit_person_voucher_discount",
DROP COLUMN "user_id",
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "max_voucher_discount" INTEGER NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "event_type" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(30);

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
