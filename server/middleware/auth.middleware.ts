import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../interface/user.interface";
import { CustomRequest } from "../interface/request.interface";
import { JwtConfig } from "../config/jwt.config";
import { OK } from "../core/success/success.reponse";

export function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {

    const cookies = req.cookies;
    if (cookies && cookies.token) {
        const user = JwtConfig.decodeJWT(cookies.token);
        req.user = user as IUser
        next();
    } else {
        new OK({
            message: "Vui lòng đăng nhập lại",
            statusCode: StatusCodes.GATEWAY_TIMEOUT
        }).send(res);
    }
}
