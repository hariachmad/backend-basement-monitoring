import { BasementId } from "../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { LineInOutBasementId } from "../value-object/LineInOutBasementId.js";

export class LineInOutBasement {
    id: LineInOutBasementId;
    lineId: LineId;
    inToBasement: BasementId | undefined;
    outToBasement: BasementId | undefined;

    constructor(id: LineInOutBasementId, lineId: LineId, inToBasement?: BasementId, outToBasement?: BasementId) {
        this.id = id;
        this.lineId = lineId;
        this.inToBasement = inToBasement;
        this.outToBasement = outToBasement;
    }

    public getId(): LineInOutBasementId {
        return this.id;
    }
    
    public getLineId(): LineId {
        return this.lineId;
    }

    public getInToBasement(): BasementId | undefined {
        return this.inToBasement;
    }

    public getOutToBasement(): BasementId | undefined {
        return this.outToBasement;
    }

    public edit(lineId: LineId, inToBasement: BasementId, outToBasement: BasementId) {
        this.lineId = lineId;
        this.inToBasement = inToBasement;
        this.outToBasement = outToBasement;
    }
}