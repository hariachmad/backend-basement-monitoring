import { LineApply, LineContext } from "../../../../../generated/prisma/enums.js";

export interface IEditIncrRedLineResponse {
    id: string;
    lineInOutBasementId: string;
    context: LineContext;
    apply: LineApply;
}
