import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IReview {
    _id: string
    rw_rating: number;
    rw_title: string,
    rw_comment: string,
    user: IUser,
    product: IProduct,
}