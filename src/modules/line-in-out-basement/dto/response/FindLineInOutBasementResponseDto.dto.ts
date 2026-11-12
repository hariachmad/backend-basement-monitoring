import { ApiProperty } from '@nestjs/swagger';
import { IFindLineInOutBasementResponse } from '../../application/dto/response/IFindLineInOutBasementResponse.dto.js';
import { LineInOutBasementId } from '../../domain/value-object/LineInOutBasementId.js';
import { LineId } from '../../../line/domain/value-object/LineId.js';
import { BasementId } from '../../../basement/domain/value-object/BasementId.js';

export class FindLineInOutBasementResponseDto implements IFindLineInOutBasementResponse {
    @ApiProperty({ description: 'LineInOutBasement UUID', example: '123e4567-e89b-12d3-a456-426614174000', type: String })
    id: LineInOutBasementId;

    @ApiProperty({ description: 'Mapping name', example: 'Basement A In/Out mapping' })
    name: string;

    @ApiProperty({ description: 'Associated Line UUID', example: '123e4567-e89b-12d3-a456-426614174001', type: String })
    lineId: LineId;

    @ApiProperty({ description: 'Target Basement UUID for entry, or null', example: '123e4567-e89b-12d3-a456-426614174002', nullable: true, type: String })
    inToBasement: BasementId | null;

    @ApiProperty({ description: 'Target Basement UUID for exit, or null', example: '123e4567-e89b-12d3-a456-426614174003', nullable: true, type: String })
    outToBasement: BasementId | null;
}

