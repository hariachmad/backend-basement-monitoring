import { BasementId } from "../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { LineInOutBasementId } from "../value-object/LineInOutBasementId.js";

export class LineInOutBasement {
    id: LineInOutBasementId;
    name: string;
    lineId: LineId;
    inToBasement: BasementId | null;
    outToBasement: BasementId | null;

    constructor(id: LineInOutBasementId, name: string, lineId: LineId, inToBasement: BasementId | null, outToBasement: BasementId | null) {
        this.id = id;
        this.name = name;
        this.lineId = lineId;
        this.inToBasement = inToBasement;
        this.outToBasement = outToBasement;
    }

    public getId(): LineInOutBasementId {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
    
    public getLineId(): LineId {
        return this.lineId;
    }

    public getInToBasement(): BasementId | null {
        return this.inToBasement;
    }

    public getOutToBasement(): BasementId | null {
        return this.outToBasement;
    }

    public edit(lineId: LineId, name: string, inToBasement: BasementId, outToBasement: BasementId) {
        this.lineId = lineId;
        this.name = name;
        this.inToBasement = inToBasement;
        this.outToBasement = outToBasement;
    }
}