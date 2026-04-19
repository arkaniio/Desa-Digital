/*
  Warnings:

  - You are about to drop the column `Adress` on the `Identity` table. All the data in the column will be lost.
  - Added the required column `Address` to the `Identity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Identity" DROP COLUMN "Adress",
ADD COLUMN     "Address" TEXT NOT NULL;
