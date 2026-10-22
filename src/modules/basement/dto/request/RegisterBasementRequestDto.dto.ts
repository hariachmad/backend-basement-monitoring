import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { IRegisterBasementRequest } from "../../application/dto/request/IRegisterBasementRequest.dto.js";

export class RegisterBasementRequestDto implements IRegisterBasementRequest {
    @IsInt()
    @Min(1)
    capacity: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    name: string;
}