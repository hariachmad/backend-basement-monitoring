import { BasementId } from "../../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../../line/domain/value-object/LineId.js";
import { LineInOutBasementId } from "../../../domain/value-object/LineInOutBasementId.js";

export interface IRegisterLineInOutBasementResponse {
    id: LineInOutBasementId;
    lineId: LineId;
    inToBasementId: BasementId | null;
    outToBasementId: BasementId | null;
}
