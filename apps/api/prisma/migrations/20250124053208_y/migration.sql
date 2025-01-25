/*
  Warnings:

  - A unique constraint covering the columns `[referral_code]` on the table `referral_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_referral_code_key" ON "referral_codes"("referral_code");
