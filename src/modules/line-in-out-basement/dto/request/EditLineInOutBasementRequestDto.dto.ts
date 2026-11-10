import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IEditLineInOutBasementRequest } from "../../application/dto/request/IEditLineInOutBasementRequest.dto.js";

export class EditLineInOutBasementRequestDto implements IEditLineInOutBasementRequest {
    @ApiProperty({ description: 'LineInOutBasement UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'Mapping name', example: 'Gate A to Basement 1' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Line UUID', example: '123e4567-e89b-12d3-a456-426614174001' })
    @IsUUID()
    @IsNotEmpty()
    lineId: string;

    @ApiProperty({ description: 'Target Basement UUID for entry direction', example: '123e4567-e89b-12d3-a456-426614174002' })
    @IsUUID()
    @IsNotEmpty()
    inToBasementId: string;

    @ApiProperty({ description: 'Target Basement UUID for exit direction', example: '123e4567-e89b-12d3-a456-426614174003' })
    @IsUUID()
    @IsNotEmpty()
    outToBasementId: string;
}
