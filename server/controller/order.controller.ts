import mongoose from "mongoose";
import { IOder, ISingleCartItemSchema } from "../interface/order.interface";
import { orderSchema } from "../models/order.schema";
import { NextFunction, Request, Response } from "express";
import { CREATED, OK } from "../core/success/success.reponse";
import { Error } from "../core/error";
import { IProduct } from "../interface/product.interface";
import { ProductSchema } from "../models/product.schema";
import { CustomRequest } from "../interface/request.interface";

const ordersRepository = mongoose.model<IOder>("Orders", orderSchema);
const productRepository = mongoose.model<IProduct>("Products", ProductSchema);
export const create = async (
    req: CustomRequest<{}, {}, IOder, {}>,
    res: Response,
    next: NextFunction
) => {
    let subtotal: number = 0;
    try {
        const { cartItem, tax, shippingFee } = req.body;

        if (!cartItem || cartItem.length < 1) {
            new Error.BadRequestError({ message: "No cart items provided" }).send(res);
            return;
        }

        if (!tax || !shippingFee) {
            new Error.BadRequestError({ message: "Thiếu phí vận chuyển hoặc thuế" }).send(res);
            return;
        }

        // Kiểm tra nếu người dùng đã có giỏ hàng (có thể sử dụng các phương thức tìm đơn hàng chưa hoàn thành)
        const existingOrder = await ordersRepository.findOne({
            user: req.user._id,
            status: 'pending',  // Giả sử đơn hàng với trạng thái 'pending' là giỏ hàng chưa hoàn tất
        });

        // Nếu có giỏ hàng cũ, cập nhật giỏ hàng
        if (existingOrder) {
            // Cập nhật giỏ hàng cũ bằng cách thêm các sản phẩm mới hoặc cập nhật số lượng nếu sản phẩm đã có trong giỏ
            for (const item of cartItem) {
                const idProduct = await productRepository.findOne({ _id: item.product });
                if (!idProduct) {
                    new Error.NotFoundError({ message: `Không tìm thấy sản phẩm với ID ${item.product}` }).send(res);
                    return;
                }

                const { prod_name, prod_price, prod_image, _id } = idProduct;
                const singleOrderItem: ISingleCartItemSchema = {
                    name: prod_name,
                    image: prod_image,
                    product: _id,
                    price: prod_price,
                    amount: item.amount,
                };

                // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                const existingItemIndex = existingOrder.cartItem.findIndex(
                    (cartItem) => cartItem.product.toString() === _id.toString()
                );

                if (existingItemIndex !== -1) {
                    // Nếu có sản phẩm rồi, cộng dồn số lượng
                    existingOrder.cartItem[existingItemIndex].amount += item.amount; // cartItem ở vị trí mà nó tìm ra
                } else {
                    // Nếu chưa có sản phẩm, thêm vào giỏ hàng
                    existingOrder.cartItem.push(singleOrderItem);
                }

                // Tính toán lại subtotal
                subtotal += prod_price * item.amount;
            }

            // Cập nhật lại giá trị của tổng đơn hàng
            existingOrder.subtotal = subtotal;
            existingOrder.total = subtotal + tax + shippingFee;
            await existingOrder.save();

            new CREATED({
                message: "Giỏ hàng đã được cập nhật",
                metadata: { items: existingOrder },
            }).send(res);

        } else {
            // Nếu không có giỏ hàng cũ, tạo đơn hàng mới như bình thường
            const orderItems = await Promise.all(
                cartItem.map(async (item) => {
                    const idProduct = await productRepository.findOne({ _id: item.product });
                    if (!idProduct) {
                        new Error.NotFoundError({ message: `Không tìm thấy sản phẩm với ID ${item.product}` }).send(res);
                        return;
                    }

                    const { prod_name, prod_price, prod_image, _id } = idProduct;
                    const singleOrderItem: ISingleCartItemSchema = {
                        name: prod_name,
                        image: prod_image,
                        product: _id,
                        price: prod_price,
                        amount: item.amount,
                    };

                    subtotal += prod_price * item.amount;
                    return singleOrderItem;
                })
            );

            const total = +tax + +subtotal + +shippingFee;
            const items = { tax, shippingFee, subtotal, total, cartItem: orderItems, user: req.user._id };
            const order = await ordersRepository.create({ ...items });

            new CREATED({
                message: "Tạo đơn hàng mới",
                metadata: { items: order },
            }).send(res);
        }

    } catch (error) {
        next(error);
    }
};



export const find = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "find",
    }).send(res);
};

export const update = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "update",
    }).send(res);
};

export const deleted = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "deleted",
    }).send(res);
};
