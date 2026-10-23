import type { LineInOutBasement as LineInOutBasementRow } from "../../../../../generated/prisma/client.js";
import { BasementId } from "../../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../../line/domain/value-object/LineId.js";
import { LineInOutBasement } from "../../../../line-in-out-basement/domain/entities/LineInOutBasement.js";
import { LineInOutBasementId } from "../../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";

export class LineInOutBasementMapper {
    static toDomain(row: LineInOutBasementRow): LineInOutBasement {
        return new LineInOutBasement(
            new LineInOutBasementId(row.id),
            new LineId(row.lineId),
            new BasementId(row.inToBasementId),
            new BasementId(row.outToBasementId),
        );
    }

    static toPersistence(lineInOutBasement: LineInOutBasement): LineInOutBasementRow {
        return {
            id: lineInOutBasement.getId().getValue(),
            lineId: lineInOutBasement.getLineId().getValue(),
            inToBasementId: lineInOutBasement.getInToBasement().getValue(),
            outToBasementId: lineInOutBasement.getOutToBasement().getValue(),
        };
    }
}
