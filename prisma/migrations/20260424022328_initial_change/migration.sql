/*
  Warnings:

  - You are about to drop the `IdentityVilage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_AuthorId_fkey";

-- DropForeignKey
ALTER TABLE "IdentityVilage" DROP CONSTRAINT "IdentityVilage_RtId_fkey";

-- DropForeignKey
ALTER TABLE "IdentityVilage" DROP CONSTRAINT "IdentityVilage_RwId_fkey";

-- DropForeignKey
ALTER TABLE "IdentityVilage" DROP CONSTRAINT "IdentityVilage_User_Id_fkey";

-- DropTable
DROP TABLE "IdentityVilage";

-- CreateTable
CREATE TABLE "Village" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Total_Population" TEXT NOT NULL,
    "Village_Age" INTEGER NOT NULL,
    "Leader_VillageId" INTEGER NOT NULL,

    CONSTRAINT "Village_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityMember" (
    "id" SERIAL NOT NULL,
    "VillageId" INTEGER NOT NULL,
    "User_Id" INTEGER NOT NULL,
    "Full_Name" TEXT NOT NULL,
    "RtId" INTEGER NOT NULL,
    "RwId" INTEGER NOT NULL,
    "Age" INTEGER NOT NULL,
    "Address" TEXT NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IdentityMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IdentityMember_Full_Name_key" ON "IdentityMember"("Full_Name");

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "IdentityMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_Leader_VillageId_fkey" FOREIGN KEY ("Leader_VillageId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityMember" ADD CONSTRAINT "IdentityMember_VillageId_fkey" FOREIGN KEY ("VillageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityMember" ADD CONSTRAINT "IdentityMember_User_Id_fkey" FOREIGN KEY ("User_Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityMember" ADD CONSTRAINT "IdentityMember_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityMember" ADD CONSTRAINT "IdentityMember_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
