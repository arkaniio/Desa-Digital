/*
  Warnings:

  - Added the required column `User_Id` to the `Identity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identity" ADD COLUMN     "User_Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
