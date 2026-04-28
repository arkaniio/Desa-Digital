/*
  Warnings:

  - The values [ADMIN] on the enum `role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `IdentityMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "role_new" AS ENUM ('KEPALA_DESA', 'RT', 'RW', 'WARGA');
ALTER TABLE "public"."User" ALTER COLUMN "Role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "Role" TYPE "role_new" USING ("Role"::text::"role_new");
ALTER TYPE "role" RENAME TO "role_old";
ALTER TYPE "role_new" RENAME TO "role";
DROP TYPE "public"."role_old";
ALTER TABLE "User" ALTER COLUMN "Role" SET DEFAULT 'WARGA';
COMMIT;

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "IdentityMember" DROP CONSTRAINT "IdentityMember_RtId_fkey";

-- DropForeignKey
ALTER TABLE "IdentityMember" DROP CONSTRAINT "IdentityMember_RwId_fkey";

-- DropForeignKey
ALTER TABLE "IdentityMember" DROP CONSTRAINT "IdentityMember_User_Id_fkey";

-- DropForeignKey
ALTER TABLE "IdentityMember" DROP CONSTRAINT "IdentityMember_VillageId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ADD COLUMN     "identityMemberId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Address" TEXT NOT NULL,
ADD COLUMN     "Password_Rt" TEXT,
ADD COLUMN     "Password_Rw" TEXT,
ADD COLUMN     "Password_kepala_desa" TEXT;

-- DropTable
DROP TABLE "IdentityMember";

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
