import { IsOptional, IsString, MinLength } from "class-validator";
import { IFindBasementRequest } from "../../application/dto/request/IFindBasementRequest.dto.js";
import { BasementId } from "../../domain/value-object/BasementId.js";

export class FindBasementRequestDto implements IFindBasementRequest{
    @IsOptional()
    id: BasementId | null;

    @IsOptional()
    @IsString()
    @MinLength(1)
    name: string | undefined;
}