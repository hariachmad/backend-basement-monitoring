import { IsOptional } from "class-validator";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { IFindbByLineIdLineInOutBasementRequest } from "../../application/dto/request/IFindByIdLineLineInOutBasementRequest.js";

export class FindByLineIdLineInOutBasementRequestDto implements IFindbByLineIdLineInOutBasementRequest {
    @IsOptional()
    lineId: LineId;
}
