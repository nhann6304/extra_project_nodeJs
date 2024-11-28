import { NextFunction, query, Request, Response } from "express";
import { OK } from "../core/success/success.reponse";
import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";
import { userSchema } from "../models/user.schema";
import { Error } from "../core/error";


const userRepository = mongoose.model<IUser>("Users", userSchema);

export const create = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "Create"
    })
}


export const find = async (req: Request, res: Response, next: NextFunction) => {
    const { id, user_name, fields, limit = 10, page = 1, ...query } = req.query;
    const a = fields as string;
    const fieldsList = a?.split(",").join(" ");
    const skip = (+page - 1) * Number(limit)
    let result = [];
    try {
        if (id) {
            result = (await userRepository
                .findOne({ _id: id, user_name: { $regex: user_name, $options: "i" }, ...query })
                .select(`${fieldsList}`)) as any;
        } else {
            result = await userRepository
                .find({ ...query })
                .select(`${fieldsList}`)
                .limit(+limit)
                .skip(skip);
        }
        if (!result) {
            new Error.NotFoundError({
                message: "No user"
            }).send(res)
        }
        new OK({
            message: "Find User Success",
            metadata: result,
        }).send(res);
    } catch (error) {
        next(error)
    }
}


export const update = async (req: Request<{}, {}, IUser, {}>, res: Response, next: NextFunction) => {
    const { _id, ...data } = req.body;
    const result = await userRepository.findByIdAndUpdate(_id, { ...data }, { new: true });
    new OK({
        message: "Update",
        metadata: result
    }).send(res)
}

export const deleted = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "Deleted"
    })
}
