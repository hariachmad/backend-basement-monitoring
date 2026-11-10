import { ApiProperty } from '@nestjs/swagger';
import { IDeleteLineResponse } from '../../application/dto/response/IDeleteLineResponse.dto.js';

export class DeleteLineResponseDto implements IDeleteLineResponse {
    @ApiProperty({ description: 'Deleted Line unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: 'Name of the deleted line', example: 'Gate A Entrance' })
    name: string;
}

