-- CreateTable
CREATE TABLE "public"."Tender" (
    "id" SERIAL NOT NULL,
    "details" TEXT NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "open_at" TIMESTAMP(3) NOT NULL,
    "close_at" TIMESTAMP(3) NOT NULL,
    "document_buy_option" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Tender" ADD CONSTRAINT "Tender_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
