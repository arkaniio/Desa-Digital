/*
  Warnings:

  - Added the required column `Image` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "Image" TEXT NOT NULL;
