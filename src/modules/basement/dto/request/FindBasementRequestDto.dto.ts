import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";
import { IFindBasementRequest } from "../../application/dto/request/IFindBasementRequest.dto.js";
import { BasementId } from "../../domain/value-object/BasementId.js";

export class FindBasementRequestDto implements IFindBasementRequest {
    @ApiPropertyOptional({ description: 'Basement unique identifier', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    @IsOptional()
    id: BasementId | null;

    @ApiPropertyOptional({ description: 'Name of the basement', example: 'Basement A' })
    @IsOptional()
    @IsString()
    @MinLength(1)
    name: string | undefined;
}
