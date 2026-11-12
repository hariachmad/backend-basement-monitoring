import { ApiProperty } from "@nestjs/swagger";
import { IInitialBasementResponse } from "../../application/dto/response/IInitialBasementResponse.dto.js";
import { BasementId } from "../../domain/value-object/BasementId.js";

export class InitialBasementResponseDto implements IInitialBasementResponse {
    @ApiProperty({ description: 'Basement unique identifier', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    id: string;

    @ApiProperty({ description: 'Maximum capacity of the basement', example: 100 })
    capacity: number;

    @ApiProperty({ description: 'Current count of vehicles or occupants', example: 0 })
    currentCount: number;

    @ApiProperty({ description: 'Name of the basement', example: 'Basement A' })
    name: string;
}

