import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import type { Direction } from "../../../../common/types/Direction.js";
import { IRegisterLineRequest } from "../../application/dto/request/IRegisterLineRequest.dto.js";

export class RegisterLineRequestDto implements IRegisterLineRequest {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsIn(['in', 'out', 'both'])
    direction: Direction;
}
