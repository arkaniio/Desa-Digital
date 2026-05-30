/*
  Warnings:

  - The values [DOMISILI,KURANG_MAMPU,NIKAH,KEMATIAN,USAHA] on the enum `Tipe_Surat` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `CreatedAt` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Rt` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Rw` table. All the data in the column will be lost.
  - You are about to drop the column `VillageId` on the `User` table. All the data in the column will be lost.
  - Added the required column `RtId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RwId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Tipe_Surat_new" AS ENUM ('SURAT_DOMISILI', 'SURAT_KURANG_MAMPU', 'SURAT_NIKAH', 'SURAT_KEMATIAN', 'SURAT_USAHA');
ALTER TABLE "Submissions" ALTER COLUMN "Tipe_Surat" TYPE "Tipe_Surat_new" USING ("Tipe_Surat"::text::"Tipe_Surat_new");
ALTER TYPE "Tipe_Surat" RENAME TO "Tipe_Surat_old";
ALTER TYPE "Tipe_Surat_new" RENAME TO "Tipe_Surat";
DROP TYPE "public"."Tipe_Surat_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Rt" DROP CONSTRAINT "Rt_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Rw" DROP CONSTRAINT "Rw_UserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_VillageId_fkey";

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "CreatedAt",
ADD COLUMN     "Dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Digital_Signature" ADD COLUMN     "Dibuat_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Rt" DROP COLUMN "UserId";

-- AlterTable
ALTER TABLE "Rw" DROP COLUMN "UserId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "VillageId",
ADD COLUMN     "RtId" INTEGER NOT NULL,
ADD COLUMN     "RwId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_Leader_VillageId_fkey" FOREIGN KEY ("Leader_VillageId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
