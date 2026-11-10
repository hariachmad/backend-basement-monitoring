import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsIn, IsNotEmpty, IsString } from "class-validator";
import type { Direction } from "../../../../common/types/Direction.js";
import { IEditLineRequest } from "../../application/dto/request/IEditLineRequest.dto.js";

export class EditLineRequestDto implements IEditLineRequest {
    @ApiProperty({ description: 'Line unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'Name of the line', example: 'Gate A Entrance' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Direction mode of the line', enum: ['in', 'out', 'both'], example: 'in' })
    @IsIn(['in', 'out', 'both'])
    direction: Direction;

    @ApiProperty({ description: 'Status indicating if the line is active', example: true })
    @IsBoolean()
    isActive: boolean;
}
