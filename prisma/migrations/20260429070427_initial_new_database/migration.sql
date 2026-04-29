/*
  Warnings:

  - You are about to drop the column `Keterangan_Penolakan` on the `Submissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "Keterangan_Penolakan",
ADD COLUMN     "Keterangan_pengajuan" TEXT DEFAULT 'NO';
