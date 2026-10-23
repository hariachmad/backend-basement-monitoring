import { IsBoolean, IsIn, IsNotEmpty, IsString } from "class-validator";
import type { Direction } from "../../../../common/types/Direction.js";
import { IEditLineRequest } from "../../application/dto/request/IEditLineRequest.dto.js";

export class EditLineRequestDto implements IEditLineRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsIn(['in', 'out', 'both'])
    direction: Direction;

    @IsBoolean()
    isActive: boolean;
}
