import { IUser } from "./user.interface";

export interface IProduct {
    _id: string;
    prod_name: string,
    prod_price: number;
    prod_description: string;
    prod_image: string
    prod_category: string
    prod_company: string
    prod_colors: string[]
    prod_featured: boolean // Sản phẩm nổi bật
    prod_freeShipping: boolean // Miễn phí giao hàng
    inventory: number,
    averageRating: number,
    user: IUser,
}
