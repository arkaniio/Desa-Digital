-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "AuthorId" INTEGER NOT NULL,
    "RwId" INTEGER,
    "RtId" INTEGER,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
