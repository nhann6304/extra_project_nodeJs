import mongoose from "mongoose";
import { IUser } from "./user.interface";
import { IProduct } from "./product.interface";

export interface ISingleCartItemSchema {
    name: string;
    image: string;
    price: number;
    amount: number;
    product: mongoose.Types.ObjectId;
}

export interface IOder {
    _id: mongoose.Types.ObjectId;
    tax: number; // thuế
    shippingFee: number; // phí vận chuyển
    subtotal: number;
    total: number;
    cartItem: Array<ISingleCartItemSchema>;
    status: string;
    user: IUser;
    clientSecret: string;
    paymentId: string;
}
