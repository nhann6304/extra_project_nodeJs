import mongoose, { PipelineStage } from "mongoose"
import { IReview } from "../interface/review.interface";
import { ReviewSchema } from "../models/review.schema";
import { CustomRequest } from "../interface/request.interface";
import { OK } from "../core/success/success.reponse";
import { send } from "process";
import { Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { Error } from "../core/error";
import { IProduct } from "../interface/product.interface";

const reviewsRepository = mongoose.model<IReview>("Reviews", ReviewSchema);

export const create = async (req: CustomRequest<{}, {}, IReview, {}>, res: Response, next: NextFunction) => {
    const { product: productId, ...data } = req.body;
    // Kiểm tra product tồn tại hay không
    try {
        const isValidProduct = await reviewsRepository.findOne({ product: productId, })
        if (!isValidProduct) {
            new Error.NotFoundError({ message: "Sản phẩm đánh giá không tồn tại trong hệ thông" });
        }

        // Kiểm tra review mà user đó có tồn tại hay chưa 
        const alreadySubmitted = await reviewsRepository.findOne({
            product: productId,
            user: req.user._id
        });
        if (alreadySubmitted) {
            new Error.NotFoundError({ message: "Bạn đã đánh giá sản phẩm này rồi" });
        };
        //
        const review = await reviewsRepository.create({ ...data, product: productId, user: req.user._id })
        new OK({
            message: "Create success!!!",
            metadata: review
        }).send(res)
    } catch (error) {
        next(error)
    }
}
export const find = async (
    req: CustomRequest<{}, {}, {}, IReview>,
    res: Response,
    next: NextFunction
) => {
    const { _id } = req.query;
    console.log(_id);
    try {
        // Sử dụng aggregate pipeline
        const items = await reviewsRepository.aggregate<PipelineStage[]>([
            {
                $match: {
                    product: new mongoose.Types.ObjectId(_id)
                }
            },
            {
                $group: {
                    _id: null, // Không nhóm theo bất kỳ field cụ thể nào
                    averageRating: { $avg: "$rw_rating" }, // Tính trung bình rating
                    ratting: { $sum: 1 }
                },
            },
        ]);
        console.log(items);

        new OK({
            message: "Find success!!!",
            // metadata: items, // Trả kết quả aggregate
        }).send(res);
    } catch (error) {
        next(error); // Gửi lỗi sang middleware error handler
    }
};


export const update = (req: CustomRequest<{}, {}, IReview, {}>, res: Response, next: NextFunction) => {
    new OK({
        message: "Create success!!!",
    }).send(res)
}

export const deleted = (req: CustomRequest<{}, {}, IReview, {}>, res: Response, next: NextFunction) => {
    new OK({
        message: "Create success!!!",
    }).send(res)
}