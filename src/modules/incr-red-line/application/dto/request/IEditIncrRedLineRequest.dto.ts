import { LineApply, LineContext } from "../../../../../generated/prisma/enums.js";

export interface IEditIncrRedLineRequest {
    id: string;
    lineInOutBasementId: string;
    context: LineContext;
    apply: LineApply;
}
