import { NextFunction, Request, Response } from "express";
import { CREATED, OK } from "../core/success/success.reponse";
import { IUser } from "../interface/user.interface";
import mongoose from "mongoose";
import { userSchema } from "../models/user.schema";
import { Error } from "../core/error";
import { reduceEachTrailingCommentRange } from "typescript";

const userRepository = mongoose.model<IUser>("Users", userSchema);


export const register = async (req: Request<{}, {}, IUser, {}>, res: Response, next: NextFunction) => {
    try {
        const { user_email, ...data } = req.body;

        const userExist = await userRepository.findOne({ user_email });
        if (userExist) {
            new Error.BadRequestError({
                message: "Email is exist!!!!"
            }).send(res)
            return
        }



        const items = await userRepository.create({ ...data, user_email: user_email });

        new CREATED({
            message: "Register success!!!",
            metadata: items
        }).send(res)
    } catch (error) {
        next(error); // sét tiếp controller
    }
};

export const login = (req: Request, res: Response) => {
    new OK({
        message: "login",
    });
};

export const logout = (req: Request, res: Response) => {
    new OK({
        message: "logout",
    });
};
