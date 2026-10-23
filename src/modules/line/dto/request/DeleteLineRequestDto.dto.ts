import { IDeleteLineRequest } from "../../application/dto/request/IDeleteLineRequest.dto.js";
import { IsNotEmpty, IsString } from "class-validator";

export class DeleteLineRequestDto implements IDeleteLineRequest{
    @IsString()
    @IsNotEmpty()
    id: string;
}
