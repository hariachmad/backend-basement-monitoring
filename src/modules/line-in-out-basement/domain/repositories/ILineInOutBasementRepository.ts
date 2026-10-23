import { BasementId } from "../../../basement/domain/value-object/BasementId.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { IFindLineInOutBasementFilter } from "../../application/dto/request/IFindAllLineInOutBasementFilter.js";
import { LineInOutBasement } from "../entities/LineInOutBasement.js";
import { LineInOutBasementId } from "../value-object/LineInOutBasementId.js";

export interface ILineInOutBasementRepository {
    findById(id: LineInOutBasementId): Promise<LineInOutBasement | null>;
    findAll(filter? : IFindLineInOutBasementFilter): Promise<LineInOutBasement[]>;
    findByLineId(lineId: LineId): Promise<LineInOutBasement | null>;
    findByBasementId(basementId: BasementId): Promise<LineInOutBasement[]>;
    save(lineInOutBasement: LineInOutBasement): Promise<void>;
    delete(id: LineInOutBasementId): Promise<void>;
}
