/*
  Warnings:

  - You are about to drop the column `UserId` on the `Submissions` table. All the data in the column will be lost.
  - Added the required column `SenderId` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_UserId_fkey";

-- AlterTable
ALTER TABLE "Submissions" DROP COLUMN "UserId",
ADD COLUMN     "SenderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
