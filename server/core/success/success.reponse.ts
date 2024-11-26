import { Response } from "express";
import { Ires } from "../../interface/response.interface";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

class SuccessApi implements Ires {
    message: string;
    metadata?: any;
    option?: any;
    reasonStatusCode?: string;
    statusCode?: number;
    totalItem?: number;

    send(res: Response) {
        if (Array.isArray(this.metadata)) {
            this.totalItem = this.message.length;
        }
        return res.status(this.statusCode).json(this)
    }
    constructor({ message, statusCode, metadata, option, reasonStatusCode }: Ires) {
        this.message = message;
        this.metadata = metadata;
        this.statusCode = statusCode
        this.reasonStatusCode = reasonStatusCode
    }
}

export class OK extends SuccessApi {
    constructor({ message, metadata, option = {}, reasonStatusCode = ReasonPhrases.OK, statusCode = StatusCodes.OK, totalItem }: Ires) {
        super({ message, metadata, option, reasonStatusCode, statusCode, totalItem })
    }
}

export class CREATED extends SuccessApi {
    constructor({ message, metadata, option = {}, reasonStatusCode = ReasonPhrases.CREATED, statusCode = StatusCodes.CREATED, totalItem }: Ires) {
        super({ message, metadata, option, reasonStatusCode, statusCode, totalItem })
    }
}