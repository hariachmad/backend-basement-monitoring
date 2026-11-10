import { ApiProperty } from "@nestjs/swagger";
import { IDeleteLineInOutBasementRequest } from "../../application/dto/request/IDeleteLineInOutBasementRequest.dto.js";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteLineInOutBasementRequestDto implements IDeleteLineInOutBasementRequest {
    @ApiProperty({ description: 'LineInOutBasement UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;
}
