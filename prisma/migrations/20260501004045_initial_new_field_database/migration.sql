/*
  Warnings:

  - Added the required column `UserId` to the `Rt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `Rw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rt" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rw" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Rw" ADD CONSTRAINT "Rw_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rt" ADD CONSTRAINT "Rt_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
