import { ApiProperty } from "@nestjs/swagger";
import { IDeleteLineRequest } from "../../application/dto/request/IDeleteLineRequest.dto.js";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteLineRequestDto implements IDeleteLineRequest {
    @ApiProperty({ description: 'Line unique identifier', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;
}
