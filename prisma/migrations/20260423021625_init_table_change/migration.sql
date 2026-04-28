/*
  Warnings:

  - Added the required column `RwId` to the `Identity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identity" ADD COLUMN     "RwId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
