/*
  Warnings:

  - You are about to drop the column `close_at` on the `Tender` table. All the data in the column will be lost.
  - You are about to drop the column `open_at` on the `Tender` table. All the data in the column will be lost.
  - You are about to drop the column `organization_id` on the `Tender` table. All the data in the column will be lost.
  - Added the required column `closeAt` to the `Tender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openAt` to the `Tender` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Tender` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `document_buy_option` on the `Tender` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Tender` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('VENDOR', 'BUYER');

-- CreateEnum
CREATE TYPE "public"."TenderStatus" AS ENUM ('OPEN', 'CLOSED', 'DRAFT');

-- DropForeignKey
ALTER TABLE "public"."Tender" DROP CONSTRAINT "Tender_organization_id_fkey";

-- AlterTable
ALTER TABLE "public"."Tender" DROP COLUMN "close_at",
DROP COLUMN "open_at",
DROP COLUMN "organization_id",
ADD COLUMN     "closeAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "openAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "organizationId" INTEGER NOT NULL,
DROP COLUMN "document_buy_option",
ADD COLUMN     "document_buy_option" BOOLEAN NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."TenderStatus" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "role",
ADD COLUMN     "role" "public"."Role" NOT NULL;

-- CreateIndex
CREATE INDEX "Tender_openAt_idx" ON "public"."Tender"("openAt");

-- CreateIndex
CREATE INDEX "Tender_closeAt_idx" ON "public"."Tender"("closeAt");

-- AddForeignKey
ALTER TABLE "public"."Tender" ADD CONSTRAINT "Tender_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
