/*
  Warnings:

  - Made the column `RwId` on table `Announcement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `RtId` on table `Announcement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "RwId" SET NOT NULL,
ALTER COLUMN "RtId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
