import mongoose from "mongoose";
import { IReview } from "../interface/review.interface";

export const ReviewSchema = new mongoose.Schema<IReview>({
    rw_rating: {
        type: Number,
        max: 5,
        min: 1,
        default: 5
    },
    rw_title: {
        type: String,
        trim: true,
    },
    rw_comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        // required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true
    }
}, { timestamps: true })


ReviewSchema.index({ product: 1, user: 1 }, { unique: true });