import { Direction } from "../../../../../common/types/Direction.js";
import { LineId } from "../../../domain/value-object/LineId.js";

export interface IFindLineResponse {
    id: LineId;
    name: string;
    direction: Direction;
    isActive: boolean;
}
