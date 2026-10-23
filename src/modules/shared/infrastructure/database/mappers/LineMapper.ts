import type { Line as LineRow } from "../../../../../generated/prisma/client.js";
import { Line } from "../../../../line/domain/entities/Line.js";
import { LineId } from "../../../../line/domain/value-object/LineId.js";

export class LineMapper {
    static toDomain(row: LineRow): Line {
        if (!Line.isDirection(row.direction)) {
            throw new Error(`invalid direction in database: ${row.direction}`);
        }

        return new Line(
            new LineId(row.id),
            row.name,
            row.direction,
            row.isActive,
        );
    }

    static toPersistence(line: Line): LineRow {
        return {
            id: line.getId().getValue(),
            name: line.getName(),
            direction: line.getDirection(),
            isActive: line.getIsActive(),
        };
    }
}
