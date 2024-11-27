import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { OK } from "../success/success.reponse";
import { Response } from "express";

class CustomErrorApi extends Error {
    statusCode: number;
    reasonStatusCode: string;

    constructor(message: string) {
        super(message);
    }

    send(res: Response) {
        return res.status(this.statusCode).json({ ...this, message: this.message });
    }
}
// Không tồn tại 404
export class NotFoundError extends CustomErrorApi {
    constructor({ message }) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
        this.reasonStatusCode = ReasonPhrases.NOT_FOUND
    }
}
//  Gửi sai yêu cầu từ client 
export class BadRequestError extends CustomErrorApi {
    constructor({ message }) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.reasonStatusCode = ReasonPhrases.BAD_REQUEST
    }
}
// Lỗi authentication
export class UnauthenticatedError extends CustomErrorApi {
    constructor({ message }) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.reasonStatusCode = ReasonPhrases.UNAUTHORIZED
    }
}
// Lỗi phân quyền
export class ForbiddenError extends CustomErrorApi {
    constructor({ message }) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
        this.reasonStatusCode = ReasonPhrases.FORBIDDEN;
    }
}
// Các lỗi khác (Lỗi không có sẵn)
export class UnavailableError extends CustomErrorApi {
    constructor({ message }) {
        super(message);
        this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
        this.reasonStatusCode = ReasonPhrases.SERVICE_UNAVAILABLE;
    }
}