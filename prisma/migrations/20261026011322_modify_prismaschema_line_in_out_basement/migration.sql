/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `basements` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `basements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "basements" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "lines" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "direction" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "line_in_out_basements" (
    "id" TEXT NOT NULL,
    "line_id" TEXT NOT NULL,
    "in_to_basement_id" TEXT NOT NULL,
    "out_to_basement_id" TEXT NOT NULL,

    CONSTRAINT "line_in_out_basements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lines_name_key" ON "lines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "line_in_out_basements_line_id_key" ON "line_in_out_basements"("line_id");

-- CreateIndex
CREATE INDEX "line_in_out_basements_in_to_basement_id_idx" ON "line_in_out_basements"("in_to_basement_id");

-- CreateIndex
CREATE INDEX "line_in_out_basements_out_to_basement_id_idx" ON "line_in_out_basements"("out_to_basement_id");

-- AddForeignKey
ALTER TABLE "line_in_out_basements" ADD CONSTRAINT "line_in_out_basements_line_id_fkey" FOREIGN KEY ("line_id") REFERENCES "lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line_in_out_basements" ADD CONSTRAINT "line_in_out_basements_in_to_basement_id_fkey" FOREIGN KEY ("in_to_basement_id") REFERENCES "basements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "line_in_out_basements" ADD CONSTRAINT "line_in_out_basements_out_to_basement_id_fkey" FOREIGN KEY ("out_to_basement_id") REFERENCES "basements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
