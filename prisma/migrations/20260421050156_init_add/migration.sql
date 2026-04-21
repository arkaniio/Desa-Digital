/*
  Warnings:

  - You are about to drop the column `Rt` on the `Identity` table. All the data in the column will be lost.
  - Added the required column `RtId` to the `Identity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identity" DROP COLUMN "Rt",
ADD COLUMN     "RtId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
