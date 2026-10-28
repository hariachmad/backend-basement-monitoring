import { IsOptional } from "class-validator";
import { IFindLineInOutBasementRequest } from "../../application/dto/request/IFindLineInOutBasementRequest.dto.js";
import { LineInOutBasementId } from "../../domain/value-object/LineInOutBasementId.js";

export class FindLineInOutBasementRequestDto implements IFindLineInOutBasementRequest {
    @IsOptional()
    id: LineInOutBasementId;
}
