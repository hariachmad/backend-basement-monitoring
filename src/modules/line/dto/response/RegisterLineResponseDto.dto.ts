import { ApiProperty } from '@nestjs/swagger';
import type { Direction } from '../../../../common/types/Direction.js';
import { IRegisterLineResponse } from '../../application/dto/response/IRegisterLineResponse.dto.js';

export class RegisterLineResponseDto implements IRegisterLineResponse {
    @ApiProperty({ description: 'Line unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: 'Name of the line', example: 'Gate A Entrance' })
    name: string;

    @ApiProperty({ description: 'Direction mode of the line', enum: ['in', 'out', 'both'], example: 'in' })
    direction: Direction;

    @ApiProperty({ description: 'Status indicating if the line is active', example: true })
    isActive: boolean;
}
