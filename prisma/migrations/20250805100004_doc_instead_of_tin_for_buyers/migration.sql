/*
  Warnings:

  - You are about to drop the column `tin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "tin",
ADD COLUMN     "urlToDoc" TEXT;
