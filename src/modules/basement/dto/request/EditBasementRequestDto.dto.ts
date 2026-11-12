import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { IEditBasementRequest } from "../../application/dto/request/IEditBasementRequest.dto.js";

export class EditBasementRequestDto implements IEditBasementRequest {
    @ApiProperty({ description: 'Basement unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ description: 'Name of the basement', example: 'Basement A' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Total capacity of the basement', example: 120, minimum: 1 })
    @IsInt()
    @Min(1)
    capacity: number;
}
