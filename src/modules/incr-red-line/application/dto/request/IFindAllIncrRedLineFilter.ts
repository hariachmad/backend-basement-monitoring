import { LineApply, LineContext } from "../../../../../generated/prisma/enums.js";
import { LineInOutBasementId } from "../../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";

export interface IFindAllIncrRedLineFilter {
    lineInOutBasementId?: LineInOutBasementId;
    context?: LineContext;
    apply?: LineApply;
}
