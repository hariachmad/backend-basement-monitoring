import { LineApply, LineContext } from "../../../../../generated/prisma/enums.js";

export interface IRegisterIncrRedLineRequest {
    lineInOutBasementId: string;
    context: LineContext;
    apply: LineApply;
}
