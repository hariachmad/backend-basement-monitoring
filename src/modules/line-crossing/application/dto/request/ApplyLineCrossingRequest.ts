import { Direction } from "../../../../../common/types/Direction.js";
import { LineId } from "../../../../line/domain/value-object/LineId.js";

export interface ApplyLineCrossingRequest {
    lineId: LineId;
    direction: Direction;
}
