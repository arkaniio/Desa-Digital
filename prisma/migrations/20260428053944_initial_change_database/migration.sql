/*
  Warnings:

  - You are about to drop the column `identityMemberId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `Password_Rt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password_Rw` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password_kepala_desa` on the `User` table. All the data in the column will be lost.
  - Added the required column `Rt_desa_sign` to the `Digital_Signature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VillageId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Village" DROP CONSTRAINT "Village_Leader_VillageId_fkey";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "identityMemberId";

-- AlterTable
ALTER TABLE "Digital_Signature" ADD COLUMN     "Rt_desa_sign" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Password_Rt",
DROP COLUMN "Password_Rw",
DROP COLUMN "Password_kepala_desa",
ADD COLUMN     "VillageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_VillageId_fkey" FOREIGN KEY ("VillageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
