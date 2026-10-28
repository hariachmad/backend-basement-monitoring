import { LineInOutBasementId } from "../../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLineId } from "../../../domain/value-object/IncrRedLineId.js";

export interface IFindIncrRedLineRequest {
    id?: IncrRedLineId;
    lineInOutBasementId?: LineInOutBasementId;
}
