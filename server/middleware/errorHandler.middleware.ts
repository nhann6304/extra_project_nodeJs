import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

interface statusError extends Error {
    statusCode: StatusCodes,
    errors: any,
    code: number
    value: any
}

interface IErrorHandler {
    err: statusError,
    req: Request,
    res: Response,
    next: NextFunction
}

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Vui lòng thử lại sau",
    };
    // Lỗi xác thực
    if (err.name === "ValidationError") {
        console.log(err);
        customError.message = Object.values(err.errors)
            .map((item: any) => item.message)
            .join(", ");
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    // if (err.name === "ValidationError") {
    //     customError.message = Object.values(err.error)
    //         .map((item: any) => item.message)
    //         .join(", ");
    //     customError.statusCode = StatusCodes.BAD_REQUEST
    // }
    // Duplicate Error
    if (err.code || err.code === 11000) {
        customError.message = `Duplicate item, Please try again`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    //
    if (err.name === "CastError") {
        customError.message = `No item found with id :${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    //
    // let userInfo:object;
    // if (req.user) userInfo = req.user;
    // logging({
    //     message: customError.message,
    //     method: req.method,
    //     url: req.url,
    //     ...userInfo,
    // });

    res.status(customError.statusCode).json({ message: customError.message })
}
export const notFoundMiddleware = ({ req, res }: Pick<IErrorHandler, "req" | "res">) => {
    res.status(StatusCodes.BAD_REQUEST).json("Router dose not exits");
}