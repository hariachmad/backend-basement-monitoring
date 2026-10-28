import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IEditLineInOutBasementRequest } from "../../application/dto/request/IEditLineInOutBasementRequest.dto.js";

export class EditLineInOutBasementRequestDto implements IEditLineInOutBasementRequest {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    lineId: string;

    @IsUUID()
    @IsNotEmpty()
    inToBasementId: string;

    @IsUUID()
    @IsNotEmpty()
    outToBasementId: string;
}
