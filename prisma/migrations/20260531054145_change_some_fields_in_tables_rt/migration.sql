/*
  Warnings:

  - Added the required column `VillageId` to the `Rt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rt" ADD COLUMN     "VillageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Rt" ADD CONSTRAINT "Rt_VillageId_fkey" FOREIGN KEY ("VillageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
