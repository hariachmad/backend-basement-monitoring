import { ApiProperty } from '@nestjs/swagger';
import { IDeleteIncrRedLineResponse } from '../../application/dto/response/IDeleteIncrRedLineResponse.dto.js';

export class DeleteIncrRedLineResponseDto implements IDeleteIncrRedLineResponse {
    @ApiProperty({ description: 'Deleted Increment/Reduce Line configuration ID', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: 'Associated LineInOutBasement ID', example: '123e4567-e89b-12d3-a456-426614174001' })
    lineInOutBasementId: string;
}

