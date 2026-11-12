import type { IncrRedLine as IncrRedLineRow } from "../../../../../../../generated/prisma/client.js";
import { IncrRedLine } from "../../../../../../incr-red-line/domain/entities/IncrRedLine.js";
import { IncrRedLineId } from "../../../../../../incr-red-line/domain/value-object/IncrRedLineId.js";
import { LineInOutBasementId } from "../../../../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";

export class IncrRedLineMapper {
    static toDomain(row: IncrRedLineRow): IncrRedLine {
        return new IncrRedLine(
            new IncrRedLineId(row.id),
            new LineInOutBasementId(row.lineInOutBasementId),
            row.context,
            row.apply,
        );
    }

    static toPersistence(incrRedLine: IncrRedLine): IncrRedLineRow {
        return {
            id: incrRedLine.getId().getValue(),
            lineInOutBasementId: incrRedLine.getLineInOutBasementId().getValue(),
            context: incrRedLine.getContext(),
            apply: incrRedLine.getApply(),
        };
    }
}
