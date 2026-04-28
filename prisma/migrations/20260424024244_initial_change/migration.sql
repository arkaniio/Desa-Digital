/*
  Warnings:

  - Changed the type of `Total_Population` on the `Village` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Village" DROP COLUMN "Total_Population",
ADD COLUMN     "Total_Population" INTEGER NOT NULL;
