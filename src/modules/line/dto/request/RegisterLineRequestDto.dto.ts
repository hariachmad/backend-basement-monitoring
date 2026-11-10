import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";
import type { Direction } from "../../../../common/types/Direction.js";
import { IRegisterLineRequest } from "../../application/dto/request/IRegisterLineRequest.dto.js";

export class RegisterLineRequestDto implements IRegisterLineRequest {
    @ApiProperty({ description: 'Name of the line', example: 'Gate A Entrance' })
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @ApiProperty({ description: 'Direction mode of the line', enum: ['in', 'out', 'both'], example: 'in' })
    @IsIn(['in', 'out', 'both'])
    direction: Direction;
}
