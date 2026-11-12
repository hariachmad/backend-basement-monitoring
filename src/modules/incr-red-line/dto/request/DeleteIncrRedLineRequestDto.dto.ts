import { ApiProperty } from "@nestjs/swagger";
import { IDeleteIncrRedLineRequest } from "../../application/dto/request/IDeleteIncrRedLineRequest.dto.js";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteIncrRedLineRequestDto implements IDeleteIncrRedLineRequest {
    @ApiProperty({ description: 'Increment/Reduce Line configuration UUID', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    id: string;
}
