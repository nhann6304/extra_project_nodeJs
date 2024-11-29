import mongoose from "mongoose";
import { IProduct } from "../interface/product.interface";
import { ProductSchema } from "../models/product.schema";
import { CustomRequest } from "../interface/request.interface";
import { NextFunction, Request, Response } from "express";
import { CREATED, OK } from "../core/success/success.reponse";
import { Error } from "../core/error";
import { IUser } from "../interface/user.interface";
import { userSchema } from "../models/user.schema";

const productRepository = mongoose.model<IProduct>("Products", ProductSchema);
const userRepository = mongoose.model<IUser>("Users", userSchema);

export const create = async (
    req: CustomRequest<{}, {}, IProduct, {}>,
    res: Response,
    next: NextFunction
) => {
    const { ...data } = req.body;
    try {
        const createBy = req.user;
        const items = await productRepository.create({ ...data, user: createBy });
        new CREATED({
            message: "Create product success!!!",
            metadata: items,
        }).send(res);
    } catch (error) {
        next(error);
    }
};

export const find = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    const { id, prod_name, fields, limit = 10, page = 1, ...query } = req.query;
    const a = fields as string;
    const fieldsList = a?.split(",").join(" ");
    const skip = (+page - 1) * Number(limit);

    let result: Array<IProduct> = [];

    try {
        if (id) {
            result = (await productRepository
                .findOne({
                    _id: id,
                    prod_name: { $regex: prod_name, $options: "i" },
                    ...query,
                })
                .populate("reviews")
                .select(`${fieldsList} user`)) as any;
        } else {
            result = await productRepository
                .find({ ...query })
                .populate("reviews")
                .limit(+limit)
                .skip(skip)
                .select(`${fieldsList} user`);
        }

        if (!result || (Array.isArray(result) && result.length === 0)) {
            new Error.NotFoundError({
                message: "No products found",
            }).send(res);
        }

        // Kết hợp thông tin user vào từng sản phẩm
        const items = await Promise.all(
            result.map(async (item: any) => {
                const user = await userRepository
                    .findById(item.user)
                    .select("-user_pass");

                return {
                    ...item.toObject(),
                    user,
                };
            })
        );

        new OK({
            message: "Find Product Success",
            metadata: { items },
        }).send(res);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request<{}, {}, IProduct, {}>, res: Response, next: NextFunction) => {
    const { _id, ...data } = req.body;
    console.log(data);
    const result = await productRepository.findByIdAndUpdate(_id, { ...data }, { new: true });
    console.log(result);
    new OK({
        message: "Update product",
        metadata: result
    }).send(res)
}

export const deleted = (
    req: CustomRequest,
    res: Response,
    nex: NextFunction
) => {
    new CREATED({
        message: "deleted done",
    }).send(res);
};
