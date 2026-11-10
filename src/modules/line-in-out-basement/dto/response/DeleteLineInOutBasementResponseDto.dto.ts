import { ApiProperty } from '@nestjs/swagger';
import { IDeleteLineInOutBasementResponse } from '../../application/dto/response/IDeleteLineInOutBasementResponse.dto.js';

export class DeleteLineInOutBasementResponseDto implements IDeleteLineInOutBasementResponse {
    @ApiProperty({ description: 'Deleted LineInOutBasement UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: 'Associated Line UUID', example: '123e4567-e89b-12d3-a456-426614174001' })
    lineId: string;
}

