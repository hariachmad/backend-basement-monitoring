import { BasementId } from "../../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../../line/domain/value-object/LineId.js";
import { LineInOutBasementId } from "../../../domain/value-object/LineInOutBasementId.js";

export interface IFindByLineIdLineInOutBasementResponse {
    id: LineInOutBasementId;
    name: string;
    lineId: LineId;
    inToBasement: BasementId | null;
    outToBasement: BasementId | null;
}
