import { BasementId } from "../../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../../line/domain/value-object/LineId.js";
import { LineInOutBasementId } from "../../../domain/value-object/LineInOutBasementId.js";

export interface IFindLineInOutBasementResponse {
    id: LineInOutBasementId;
    lineId: LineId;
    inToBasement: BasementId | null;
    outToBasement: BasementId | null;
}
