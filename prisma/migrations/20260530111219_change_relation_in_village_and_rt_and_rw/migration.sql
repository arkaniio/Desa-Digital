/*
  Warnings:

  - You are about to drop the column `RtId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `RwId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Leader_VillageId` on the `Village` table. All the data in the column will be lost.
  - Added the required column `LeaderId` to the `Rt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VillageId` to the `Rt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LeaderId` to the `Rw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VillageId` to the `Rw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LeaderId` to the `Village` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_RtId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_RwId_fkey";

-- DropForeignKey
ALTER TABLE "Village" DROP CONSTRAINT "Village_Leader_VillageId_fkey";

-- AlterTable
ALTER TABLE "Rt" ADD COLUMN     "LeaderId" INTEGER NOT NULL,
ADD COLUMN     "VillageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rw" ADD COLUMN     "LeaderId" INTEGER NOT NULL,
ADD COLUMN     "VillageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "RtId",
DROP COLUMN "RwId";

-- AlterTable
ALTER TABLE "Village" DROP COLUMN "Leader_VillageId",
ADD COLUMN     "LeaderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_LeaderId_fkey" FOREIGN KEY ("LeaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rw" ADD CONSTRAINT "Rw_LeaderId_fkey" FOREIGN KEY ("LeaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rw" ADD CONSTRAINT "Rw_VillageId_fkey" FOREIGN KEY ("VillageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rt" ADD CONSTRAINT "Rt_LeaderId_fkey" FOREIGN KEY ("LeaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rt" ADD CONSTRAINT "Rt_VillageId_fkey" FOREIGN KEY ("VillageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
