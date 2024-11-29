import mongoose from "mongoose";
import { IProduct } from "../interface/product.interface";
import { ProductSchema } from "../models/product.schema";
import { CustomRequest } from "../interface/request.interface";
import { NextFunction, Response } from "express";
import { CREATED, OK } from "../core/success/success.reponse";
import { Error } from "../core/error";


const productRepository = mongoose.model<IProduct>("Products", ProductSchema);


export const create = async (req: CustomRequest<{}, {}, IProduct, {}>, res: Response, next: NextFunction) => {
    const { ...data } = req.body;
    try {
        const createBy = req.user
        const items = await productRepository.create({ ...data, user: createBy })
        new CREATED({
            message: "Create product success!!!",
            metadata: items
        }).send(res)
    } catch (error) {
        next(error)
    }
}


export const find = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id, prod_name, fields, limit = 10, page = 1, ...query } = req.query;
    const a = fields as string;
    const fieldsList = a?.split(",").join(" ");
    const skip = (+page - 1) * Number(limit)
    let result = [];
    try {
        if (id) {
            result = (await productRepository
                .findOne({ _id: id, prod_name: { $regex: prod_name, $options: "i" }, ...query })
                .select(`${fieldsList}`)) as any;
        } else {
            result = await productRepository
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



export const update = (req: CustomRequest, res: Response, nex: NextFunction) => {
    new CREATED({
        message: "update done",
    }).send(res)
}


export const deleted = (req: CustomRequest, res: Response, nex: NextFunction) => {
    new CREATED({
        message: "deleted done",
    }).send(res)
}