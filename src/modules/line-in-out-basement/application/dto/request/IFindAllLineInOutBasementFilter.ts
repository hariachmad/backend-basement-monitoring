import type { LineId } from "../../../../line/domain/value-object/LineId.js";
import type { BasementId } from "../../../../basement/domain/value-object/BasementId.js";

export interface IFindLineInOutBasementFilter {
    lineId?: LineId;
    inToBasement?: BasementId;
    outToBasement?: BasementId;
}