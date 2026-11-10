import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IRegisterLineInOutBasementRequest } from "../../application/dto/request/IRegisterLineInOutBasementRequest.dto.js";

export class RegisterLineInOutBasementRequestDto implements IRegisterLineInOutBasementRequest {
    @ApiProperty({ description: 'Line UUID', example: '123e4567-e89b-12d3-a456-426614174001' })
    @IsUUID()
    @IsNotEmpty()
    lineId: string;

    @ApiProperty({ description: 'Mapping name', example: 'Gate A to Basement 1' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Target Basement UUID for entry direction', example: '123e4567-e89b-12d3-a456-426614174002' })
    @IsUUID()
    @IsNotEmpty()
    inToBasementId: string;

    @ApiProperty({ description: 'Target Basement UUID for exit direction', example: '123e4567-e89b-12d3-a456-426614174003' })
    @IsUUID()
    @IsNotEmpty()
    outToBasementId: string;
}
