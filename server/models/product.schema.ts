import mongoose from "mongoose";
import { IProduct } from "../interface/product.interface";
import { ECategory, ECompany } from "../enums/product.enum";

export const ProductSchema = new mongoose.Schema<IProduct>({
    prod_name: {
        type: String,
        trim: true,
        required: [true, "prod_name không được để trống"]
    },
    prod_price: {
        type: Number,
        required: [true, "prod_price không được để trống"],
        default: 0
    },
    prod_description: {
        type: String,
        required: [true, "prod_description không được để trống"],
    },
    prod_image: {
        type: String,
        default: "/uploads/example.jpg"
    },
    prod_category: {
        type: String,
        required: [true, "prod_category  không được để trống"],
        enum: {
            values: Object.values(ECategory),
            message: `{VALUE} is not supported`
        },
    },
    prod_company: {
        type: String,
        enum: {
            values: Object.values(ECompany),
            message: `{VALUE} is not supported`
        },
    },
    prod_colors: {
        type: [String],
        required: false,
    },
    prod_featured: {
        type: Boolean,
        default: false
    },
    prod_freeShipping: {
        type: Boolean,
        default: false
    },
    inventory: {
        type: Number,
        required: false,
        default: 15
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false,
    }
},
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
    ref: "Reviews",  // Tham chiếu đến model nào
    localField: "_id", // dựa vào gì mà truy vấn
    foreignField: "product", // Truy vấn theo 
    justOne: false, // lấy 1 hay nhièu
    // match // điều kiện truy vấn ví dụ ratting ===1
})