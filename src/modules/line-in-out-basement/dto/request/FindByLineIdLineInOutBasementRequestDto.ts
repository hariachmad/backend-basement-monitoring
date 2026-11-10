import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { LineId } from "../../../line/domain/value-object/LineId.js";
import { IFindbByLineIdLineInOutBasementRequest } from "../../application/dto/request/IFindByIdLineLineInOutBasementRequest.js";

export class FindByLineIdLineInOutBasementRequestDto implements IFindbByLineIdLineInOutBasementRequest {
    @ApiPropertyOptional({ description: 'Line UUID', example: '123e4567-e89b-12d3-a456-426614174001', type: String })
    @IsOptional()
    lineId: LineId;
}
