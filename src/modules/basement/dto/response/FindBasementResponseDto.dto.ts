import { ApiProperty } from '@nestjs/swagger';
import { BasementId } from '../../domain/value-object/BasementId.js';
import { IFindBasementResponse } from '../../application/dto/response/IFindBasementResponse.dto.js';

export class FindBasementResponseDto implements IFindBasementResponse {
    @ApiProperty({ description: 'Basement unique identifier', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    id: BasementId;

    @ApiProperty({ description: 'Name of the basement', example: 'Basement A' })
    name: string;

    @ApiProperty({ description: 'Maximum capacity of the basement', example: 100 })
    capacity: number;

    @ApiProperty({ description: 'Current vehicle / occupant count', example: 45 })
    currentCount: number;

    @ApiProperty({ description: 'Available remaining slots', example: 55 })
    available: number;

    @ApiProperty({ description: 'Whether the basement is full', example: false })
    isFull: boolean;

    @ApiProperty({ description: 'Last update timestamp', example: '2026-11-10T10:00:00.000Z' })
    updatedAt: Date;
}

