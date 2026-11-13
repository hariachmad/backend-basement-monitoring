import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { IInitialBasementRequest } from "../../application/dto/request/IInitialBasementRequest.dto.js";
import { BasementId } from "../../domain/value-object/BasementId.js";

export class InitialBasementRequestDto implements IInitialBasementRequest {
    @ApiProperty({ description: 'Amount basement initial', example: 100, minimum: 1 })
    @IsInt()
    @Min(1)
    amount: number;

    @ApiPropertyOptional({ description: 'Basement unique identifier', example: 'Basement A' })
    @IsOptional()
    @IsString()
    @MinLength(1)
    id: string;
}
