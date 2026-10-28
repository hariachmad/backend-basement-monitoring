import { IsOptional } from "class-validator";
import { LineInOutBasementId } from "../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLineId } from "../../domain/value-object/IncrRedLineId.js";
import { IFindIncrRedLineRequest } from "../../application/dto/request/IFindIncrRedLineRequest.dto.js";

export class FindIncrRedLineRequestDto implements IFindIncrRedLineRequest {
    @IsOptional()
    id: IncrRedLineId | undefined;

    @IsOptional()
    lineInOutBasementId: LineInOutBasementId | undefined;
}
