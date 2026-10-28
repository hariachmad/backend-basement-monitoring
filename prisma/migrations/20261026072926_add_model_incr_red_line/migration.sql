-- CreateEnum
CREATE TYPE "LineContext" AS ENUM ('IN', 'OUT');

-- CreateEnum
CREATE TYPE "LineApply" AS ENUM ('INCREMENT', 'REDUCE');

-- CreateTable
CREATE TABLE "incr_red_lines" (
    "id" TEXT NOT NULL,
    "line_in_out_basement_id" TEXT NOT NULL,
    "context" "LineContext" NOT NULL,
    "apply" "LineApply" NOT NULL,

    CONSTRAINT "incr_red_lines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "incr_red_lines_line_in_out_basement_id_key" ON "incr_red_lines"("line_in_out_basement_id");

-- AddForeignKey
ALTER TABLE "incr_red_lines" ADD CONSTRAINT "incr_red_lines_line_in_out_basement_id_fkey" FOREIGN KEY ("line_in_out_basement_id") REFERENCES "line_in_out_basements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
