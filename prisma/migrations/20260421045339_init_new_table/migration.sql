/*
  Warnings:

  - The values [ADMIN_RT,USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'RT', 'RW', 'WARGA');
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- CreateTable
CREATE TABLE "Rw" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Rw_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Rt" (
    "Id" SERIAL NOT NULL,
    "Number" INTEGER NOT NULL,
    "RwId" INTEGER NOT NULL,

    CONSTRAINT "Rt_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Rt" ADD CONSTRAINT "Rt_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
