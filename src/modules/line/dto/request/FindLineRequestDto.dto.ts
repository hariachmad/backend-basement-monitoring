import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";
import { IFindLineRequest } from "../../application/dto/request/IFindLineRequest.dto.js";
import { LineId } from "../../domain/value-object/LineId.js";

export class FindLineRequestDto implements IFindLineRequest {
    @ApiPropertyOptional({ description: 'Line unique identifier', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    @IsOptional()
    id: LineId | undefined;

    @ApiPropertyOptional({ description: 'Name of the line', example: 'Gate A Entrance' })
    @IsOptional()
    @IsString()
    @MinLength(1)
    name: string | undefined;
}
