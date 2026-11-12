import { ApiProperty } from '@nestjs/swagger';
import { IRegisterBasementResponse } from '../../application/dto/response/IRegisterBasementResponse.dto.js';

export class RegisterBasementResponseDto implements IRegisterBasementResponse {
    @ApiProperty({ description: 'Basement unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @ApiProperty({ description: 'Name of the basement', example: 'Basement A' })
    name: string;

    @ApiProperty({ description: 'Maximum capacity of the basement', example: 100 })
    capacity: number;

    @ApiProperty({ description: 'Current count of vehicles or occupants', example: 0 })
    currentCount: number;
}

