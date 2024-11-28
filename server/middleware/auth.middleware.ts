import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../interface/user.interface";
import { CustomRequest } from "../interface/request.interface";
import { JwtConfig } from "../config/jwt.config";
import { OK } from "../core/success/success.reponse";
import mongoose from "mongoose";
import { userSchema } from "../models/user.schema";
const userRepository = mongoose.model<IUser>("Users", userSchema);
export async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (cookies && cookies.token) {
        const result = JwtConfig.decodeJWT<IUser>(cookies.token);
        const user = await userRepository.findById(result._id);
        req.user = user;
        next();
    } else {
        new OK({
            message: "Vui lòng đăng nhập lại",
            statusCode: StatusCodes.GATEWAY_TIMEOUT
        }).send(res);
    }
}
