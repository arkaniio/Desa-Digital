-- CreateTable
CREATE TABLE "Identity" (
    "id" SERIAL NOT NULL,
    "Full_Name" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "Adress" TEXT NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Identity_Full_Name_key" ON "Identity"("Full_Name");
