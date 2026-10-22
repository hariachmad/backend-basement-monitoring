/*
  Warnings:

  - You are about to drop the `Basement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Basement";

-- CreateTable
CREATE TABLE "basements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "currentCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "basements_pkey" PRIMARY KEY ("id")
);
