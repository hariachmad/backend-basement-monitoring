import { LineId } from "../../../../line/domain/value-object/LineId.js";
import { LineInOutBasementId } from "../../../domain/value-object/LineInOutBasementId.js";

export interface IFindLineInOutBasementRequest {
    id?: LineInOutBasementId;
    lineId?: LineId;
}
