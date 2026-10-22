import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { IEditBasementRequest } from "../../application/dto/request/IEditBasementRequest.dto.js";

export class EditBasementRequestDto implements IEditBasementRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @Min(1)
    capacity: number;
}