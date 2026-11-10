import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IFindLineInOutBasementRequest } from "../../application/dto/request/IFindLineInOutBasementRequest.dto.js";
import { LineInOutBasementId } from "../../domain/value-object/LineInOutBasementId.js";

export class FindLineInOutBasementRequestDto implements IFindLineInOutBasementRequest {
    @ApiPropertyOptional({ description: 'LineInOutBasement UUID', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    @IsOptional()
    id: LineInOutBasementId;
}
