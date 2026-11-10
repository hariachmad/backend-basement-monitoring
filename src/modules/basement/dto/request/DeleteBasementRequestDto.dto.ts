import { ApiProperty } from "@nestjs/swagger";
import { IDeleteBasementRequest } from "../../application/dto/request/IDeleteBasementRequest.dto.js";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteBasementRequestDto implements IDeleteBasementRequest {
    @ApiProperty({ description: 'Basement unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;
}
