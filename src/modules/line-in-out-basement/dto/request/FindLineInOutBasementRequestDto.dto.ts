import { IsOptional } from "class-validator";
import { IFindLineInOutBasementRequest } from "../../application/dto/request/IFindLineInOutBasementRequest.dto.js";
import { LineInOutBasementId } from "../../domain/value-object/LineInOutBasementId.js";
import { LineId } from "../../../line/domain/value-object/LineId.js";

export class FindLineInOutBasementRequestDto implements IFindLineInOutBasementRequest {
    @IsOptional()
    id: LineInOutBasementId | undefined;

    @IsOptional()
    lineId: LineId | undefined;
}
