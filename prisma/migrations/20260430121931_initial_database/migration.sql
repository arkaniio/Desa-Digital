-- CreateEnum
CREATE TYPE "role" AS ENUM ('KEPALA_DESA', 'RT', 'RW', 'WARGA');

-- CreateEnum
CREATE TYPE "Tipe_Surat" AS ENUM ('DOMISILI', 'KURANG_MAMPU', 'NIKAH', 'KEMATIAN', 'USAHA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" "role" DEFAULT 'WARGA',
    "Avatar" TEXT,
    "VillageId" INTEGER NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Digital_Signature" (
    "id" SERIAL NOT NULL,
    "No_surat_desa" INTEGER NOT NULL,
    "SubmissionsId" INTEGER NOT NULL,
    "Kepala_desa_sign" BOOLEAN NOT NULL,
    "Rt_desa_sign" BOOLEAN NOT NULL,

    CONSTRAINT "Digital_Signature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" SERIAL NOT NULL,
    "Nomor_surat_rt" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "RtId" INTEGER NOT NULL,
    "RwId" INTEGER NOT NULL,
    "Dokumen_pengajuan" TEXT NOT NULL,
    "Tipe_Surat" "Tipe_Surat" NOT NULL,
    "Status" TEXT DEFAULT 'PENDING',
    "Keterangan_pengajuan" TEXT DEFAULT 'DIAJUKAN',
    "Keperluan" TEXT NOT NULL,
    "Tanggal_pengajuan" TIMESTAMP(3) NOT NULL,
    "Tanggal_selesai" TIMESTAMP(3),

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "AuthorId" INTEGER NOT NULL,
    "RwId" INTEGER NOT NULL,
    "RtId" INTEGER NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Village" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Total_Population" INTEGER NOT NULL,
    "Village_Age" INTEGER NOT NULL,
    "Leader_VillageId" INTEGER NOT NULL,

    CONSTRAINT "Village_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_VillageId_fkey" FOREIGN KEY ("VillageId") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Digital_Signature" ADD CONSTRAINT "Digital_Signature_SubmissionsId_fkey" FOREIGN KEY ("SubmissionsId") REFERENCES "Submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rt" ADD CONSTRAINT "Rt_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
