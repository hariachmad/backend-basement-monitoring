import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { IRegisterBasementRequest } from "../../application/dto/request/IRegisterBasementRequest.dto.js";

export class RegisterBasementRequestDto implements IRegisterBasementRequest {
    @ApiProperty({ description: 'Total capacity of the basement', example: 100, minimum: 1 })
    @IsInt()
    @Min(1)
    capacity: number;

    @ApiPropertyOptional({ description: 'Name of the basement', example: 'Basement A' })
    @IsOptional()
    @IsString()
    @MinLength(1)
    name: string;
}
