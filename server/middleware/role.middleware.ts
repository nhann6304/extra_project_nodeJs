import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../interface/request.interface";
import { ERole } from "../enums/role.enum";
import { Error } from "../core/error";

export const roleMiddleware = (...role: any) => {
    // if (req.user.role !== ERole.ADMIN) {
    //     throw new Error.UnavailableError({
    //         message: "Unauthorized to access this route"
    //     });
    // }
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        console.log(req.user);
        if (!role.includes(req.user.role)) {
            throw new Error.UnavailableError({
                message: "Bạn không đủ quyền để thực hiện thao tác"
            })
        }
        next()
    }
}


