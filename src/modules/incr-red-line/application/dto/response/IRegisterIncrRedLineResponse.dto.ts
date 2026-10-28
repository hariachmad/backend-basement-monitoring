import { LineApply, LineContext } from "../../../../../generated/prisma/enums.js";
import { LineInOutBasementId } from "../../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLineId } from "../../../domain/value-object/IncrRedLineId.js";

export interface IRegisterIncrRedLineResponse {
    id: IncrRedLineId;
    lineInOutBasementId: LineInOutBasementId;
    context: LineContext;
    apply: LineApply;
}
