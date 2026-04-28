/*
  Warnings:

  - The `Role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('ADMIN', 'RT', 'RW', 'WARGA');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Role",
ADD COLUMN     "Role" "role" NOT NULL DEFAULT 'WARGA';

-- DropEnum
DROP TYPE "Role";
