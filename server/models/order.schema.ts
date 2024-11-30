import mongoose from "mongoose";
import { IOder, ISingleCartItemSchema } from "../interface/order.interface";
import { EStatus } from "../enums/status.enum";


// 1 Sản phẩm có thêm nằm trong nhiều giỏ hàng <=> 1 giỏ hàng thì có thể nhiều sản phẩm

// => many to many => tạo bảng phụ


const SingleCartItemSchema = new mongoose.Schema<ISingleCartItemSchema>({
    name: { type: String, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    amount: { type: Number, require: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        require: true
    }
})



export const orderSchema = new mongoose.Schema<IOder>({
    tax: {
        type: Number,
        required: true,
    },
    shippingFee: {
        type: Number,
        required: true,
    },
    subtotal: { // không bao gom thue
        type: Number,
        required: true,
    },
    total: { // gom tat cả ke ca thue
        type: Number,
        required: true,
    },

    cartItem: [SingleCartItemSchema],

    status: {
        type: String,
        enum: {
            values: Object.values(EStatus),
        },
        default: EStatus.PENDING,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    clientSecret: {
        type: String,
        required: true,
        default: "1"
    },
    paymentId: {
        type: String,
        required: true,
        default: "1"
    },
});


