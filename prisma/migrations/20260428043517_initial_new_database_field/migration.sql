-- CreateEnum
CREATE TYPE "Tipe_Surat" AS ENUM ('DOMISILI', 'KURANG_MAMPU', 'NIKAH', 'KEMATIAN', 'USAHA');

-- CreateTable
CREATE TABLE "Digital_Signature" (
    "id" SERIAL NOT NULL,
    "No_surat_desa" INTEGER NOT NULL,
    "SubmissionsId" INTEGER NOT NULL,
    "Kepala_desa_sign" BOOLEAN NOT NULL,

    CONSTRAINT "Digital_Signature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" SERIAL NOT NULL,
    "Nomor_surat_rt" INTEGER NOT NULL,
    "RtId" INTEGER NOT NULL,
    "RwId" INTEGER NOT NULL,
    "Dokumen_pengajuan" TEXT NOT NULL,
    "Tipe_Surat" "Tipe_Surat" NOT NULL,
    "Status" TEXT DEFAULT 'DIAJUKAN',
    "Keterangan_Penolakan" TEXT,
    "Keperluan" TEXT NOT NULL,
    "Tanggal_Pengajuan" TIMESTAMP(3) NOT NULL,
    "Tanggal_Selesai" TIMESTAMP(3),

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Digital_Signature" ADD CONSTRAINT "Digital_Signature_SubmissionsId_fkey" FOREIGN KEY ("SubmissionsId") REFERENCES "Submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_RtId_fkey" FOREIGN KEY ("RtId") REFERENCES "Rt"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_RwId_fkey" FOREIGN KEY ("RwId") REFERENCES "Rw"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
