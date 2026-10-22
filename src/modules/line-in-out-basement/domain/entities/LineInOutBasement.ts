import { BasementId } from "../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { LineInOutBasementId } from "../value-object/LineInOutBasementId.js";

export class LineInOutBasement {
    id: LineInOutBasementId;
    lineId: LineId;
    inToBasement: BasementId;
    outToBasement: BasementId;

    edit(lineId: LineId, inToBasement: BasementId, outToBasement: BasementId) {
        this.lineId = lineId;
        this.inToBasement = inToBasement;
        this.outToBasement = outToBasement;
        
    }
}