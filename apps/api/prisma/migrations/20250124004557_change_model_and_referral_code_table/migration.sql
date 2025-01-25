/*
  Warnings:

  - You are about to drop the column `referal_code` on the `referral_codes` table. All the data in the column will be lost.
  - You are about to drop the `ticket_bookeds` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `referral_codes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "referral_codes" DROP COLUMN "referal_code",
ADD COLUMN     "referral_code" VARCHAR(50);

-- DropTable
DROP TABLE "ticket_bookeds";

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_userId_key" ON "referral_codes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
