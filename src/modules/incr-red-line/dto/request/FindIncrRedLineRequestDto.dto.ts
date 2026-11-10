import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { LineInOutBasementId } from "../../../line-in-out-basement/domain/value-object/LineInOutBasementId.js";
import { IncrRedLineId } from "../../domain/value-object/IncrRedLineId.js";
import { IFindIncrRedLineRequest } from "../../application/dto/request/IFindIncrRedLineRequest.dto.js";

export class FindIncrRedLineRequestDto implements IFindIncrRedLineRequest {
    @ApiPropertyOptional({ description: 'Increment/Reduce Line configuration UUID', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    @IsOptional()
    id: IncrRedLineId | undefined;

    @ApiPropertyOptional({ description: 'LineInOutBasement UUID', example: '123e4567-e89b-12d3-a456-426614174001', type: String })
    @IsOptional()
    lineInOutBasementId: LineInOutBasementId | undefined;
}
