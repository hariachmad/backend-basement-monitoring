/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `line_in_out_basements` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `line_in_out_basements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "line_in_out_basements" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "line_in_out_basements_name_key" ON "line_in_out_basements"("name");
