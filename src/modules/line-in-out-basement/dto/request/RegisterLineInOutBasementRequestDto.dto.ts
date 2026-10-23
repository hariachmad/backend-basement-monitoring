import { IsNotEmpty, IsUUID } from "class-validator";
import { IRegisterLineInOutBasementRequest } from "../../application/dto/request/IRegisterLineInOutBasementRequest.dto.js";

export class RegisterLineInOutBasementRequestDto implements IRegisterLineInOutBasementRequest {
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
