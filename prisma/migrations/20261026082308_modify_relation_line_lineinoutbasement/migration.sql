-- DropIndex
DROP INDEX "line_in_out_basements_line_id_key";

-- CreateIndex
CREATE INDEX "line_in_out_basements_line_id_idx" ON "line_in_out_basements"("line_id");
