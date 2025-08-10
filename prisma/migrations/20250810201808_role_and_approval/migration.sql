-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT true;
