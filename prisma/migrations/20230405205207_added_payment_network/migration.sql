/*
  Warnings:

  - Added the required column `network` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentNetwork" AS ENUM ('MASTERCARD', 'VISA', 'JCB', 'AMERICAN_EXPRESS', 'DINERS_CLUB');

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "network" "PaymentNetwork" NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "image_url" DROP NOT NULL;
