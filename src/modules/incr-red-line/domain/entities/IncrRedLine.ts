import { LineApply, LineContext } from "../../../../generated/prisma/enums.js";
import { LineInOutBasementId } from "../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLineId } from "../value-object/IncrRedLineId.js";

export class IncrRedLine {
    private readonly id: IncrRedLineId;
    private lineInOutBasementId: LineInOutBasementId;
    private context: LineContext;
    private apply: LineApply;

    constructor(
        id: IncrRedLineId,
        lineInOutBasementId: LineInOutBasementId,
        context: LineContext,
        apply: LineApply,
    ) {
        this.id = id;
        this.lineInOutBasementId = lineInOutBasementId;
        this.context = context;
        this.apply = apply;
    }

    public getId(): IncrRedLineId {
        return this.id;
    }

    public getLineInOutBasementId(): LineInOutBasementId {
        return this.lineInOutBasementId;
    }

    public getContext(): LineContext {
        return this.context;
    }

    public getLineContext(): LineContext {
        return this.context;
    }

    public getApply(): LineApply {
        return this.apply;
    }

    public getLineApply(): LineApply {
        return this.apply;
    }

    public edit(lineInOutBasementId: LineInOutBasementId, context: LineContext, apply: LineApply) {
        this.lineInOutBasementId = lineInOutBasementId;
        this.context = context;
        this.apply = apply;
    }
}