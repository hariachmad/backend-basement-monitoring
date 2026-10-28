import { LineInOutBasementId } from "../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLine } from "../entities/IncrRedLine.js";
import { IncrRedLineId } from "../value-object/IncrRedLineId.js";
import { IFindAllIncrRedLineFilter } from "../../application/dto/request/IFindAllIncrRedLineFilter.js";

export interface IIncrRedLineRepository {
    findById(id: IncrRedLineId): Promise<IncrRedLine | null>;
    findAll(filter?: IFindAllIncrRedLineFilter): Promise<IncrRedLine[]>;
    findByLineInOutBasementId(lineInOutBasementId: LineInOutBasementId): Promise<IncrRedLine[]>;
    save(incrRedLine: IncrRedLine): Promise<void>;
    delete(id: IncrRedLineId): Promise<void>;
}
