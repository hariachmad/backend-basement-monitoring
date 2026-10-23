import { IsOptional, IsString, MinLength } from "class-validator";
import { IFindLineRequest } from "../../application/dto/request/IFindLineRequest.dto.js";
import { LineId } from "../../domain/value-object/LineId.js";

export class FindLineRequestDto implements IFindLineRequest{
    @IsOptional()
    id: LineId | undefined;

    @IsOptional()
    @IsString()
    @MinLength(1)
    name: string | undefined;
}
