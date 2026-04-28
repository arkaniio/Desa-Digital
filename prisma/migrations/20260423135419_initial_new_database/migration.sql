/*
  Warnings:

  - You are about to drop the `Identity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Identity" DROP CONSTRAINT "Identity_RtId_fkey";

-- DropForeignKey
ALTER TABLE "Identity" DROP CONSTRAINT "Identity_RwId_fkey";

-- DropForeignKey
ALTER TABLE "Identity" DROP CONSTRAINT "Identity_User_Id_fkey";

-- DropTable
DROP TABLE "Identity";

-- CreateTable
CREATE TABLE "IdentityVilage" (
    "id" SERIAL NOT NULL,
    "User_Id" INTEGER NOT NULL,
    "Full_Name" TEXT NOT NULL,
    "RtId" INTEGER NOT NULL,
    "RwId" INTEGER NOT NULL,
    "Age" INTEGER NOT NULL,
    "Address" TEXT NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentityVilage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdentityVilage_Full_Name_key" ON "IdentityVilage"("Full_Name");

-- AddForeignKey
ALTER TABLE "IdentityVilage" ADD CONSTRAINT "IdentityVilage_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityVilage" ADD CONSTRAINT "IdentityVilage_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityVilage" ADD CONSTRAINT "IdentityVilage_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
