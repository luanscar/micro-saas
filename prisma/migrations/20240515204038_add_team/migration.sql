-- AlterTable
ALTER TABLE "team" ADD COLUMN     "companyId" TEXT;

-- CreateIndex
CREATE INDEX "team_companyId_idx" ON "team"("companyId");

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
