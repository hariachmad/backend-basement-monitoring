import { IDeleteBasementRequest } from "../../application/dto/request/IDeleteBasementRequest.dto.js";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteBasementRequestDto implements IDeleteBasementRequest{
    @IsString()
    @IsNotEmpty()
    id: string;
}