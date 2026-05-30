/*
  Warnings:

  - You are about to drop the column `LeaderId` on the `Rt` table. All the data in the column will be lost.
  - You are about to drop the column `VillageId` on the `Rt` table. All the data in the column will be lost.
  - You are about to drop the column `LeaderId` on the `Rw` table. All the data in the column will be lost.
  - You are about to drop the column `LeaderId` on the `Village` table. All the data in the column will be lost.
  - You are about to drop the `Digital_Signature` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[QrCodeSignature]` on the table `Submissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Name]` on the table `Village` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `RtId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RwId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VillageId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Leader_VillageId` to the `Village` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Digital_Signature" DROP CONSTRAINT "Digital_Signature_SubmissionsId_fkey";

-- DropForeignKey
ALTER TABLE "Rt" DROP CONSTRAINT "Rt_LeaderId_fkey";

-- DropForeignKey
ALTER TABLE "Rt" DROP CONSTRAINT "Rt_VillageId_fkey";

-- DropForeignKey
ALTER TABLE "Rw" DROP CONSTRAINT "Rw_LeaderId_fkey";

-- DropForeignKey
ALTER TABLE "Village" DROP CONSTRAINT "Village_LeaderId_fkey";

-- AlterTable
ALTER TABLE "Rt" DROP COLUMN "LeaderId",
DROP COLUMN "VillageId",
ADD COLUMN     "Leader_Id" INTEGER;

-- AlterTable
ALTER TABLE "Rw" DROP COLUMN "LeaderId",
ADD COLUMN     "Leader_Id" INTEGER;

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "Kepala_desa_sign" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "QrCodeSignature" TEXT,
ADD COLUMN     "Rt_desa_sign" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "Tanggal_pengajuan" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "RtId" INTEGER NOT NULL,
ADD COLUMN     "RwId" INTEGER NOT NULL,
ADD COLUMN     "VillageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Village" DROP COLUMN "LeaderId",
ADD COLUMN     "Leader_VillageId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Digital_Signature";

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_QrCodeSignature_key" ON "Submissions"("QrCodeSignature");

-- CreateIndex
CREATE UNIQUE INDEX "Village_Name_key" ON "Village"("Name");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_VillageId_fkey" FOREIGN KEY ("VillageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_Leader_VillageId_fkey" FOREIGN KEY ("Leader_VillageId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rw" ADD CONSTRAINT "Rw_Leader_Id_fkey" FOREIGN KEY ("Leader_Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rt" ADD CONSTRAINT "Rt_Leader_Id_fkey" FOREIGN KEY ("Leader_Id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
