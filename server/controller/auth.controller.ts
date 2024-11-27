import { NextFunction, Request, Response } from "express";
import { CREATED, OK } from "../core/success/success.reponse";
import { IUser } from "../interface/user.interface";
import mongoose from "mongoose";
import { userSchema } from "../models/user.schema";
import { Error } from "../core/error";
import { reduceEachTrailingCommentRange } from "typescript";
import { PasswordConfig } from "../helper/hashPassword.helper";
import { JwtConfig } from "../config/jwt.config";
import { CookieConfig } from "../helper/cookie.config.helper";

const userRepository = mongoose.model<IUser>("Users", userSchema);


export const register = async (req: Request<{}, {}, IUser, {}>, res: Response, next: NextFunction) => {
    try {
        const { user_email, ...data } = req.body;

        const userExist = await userRepository.findOne({ user_email });
        if (userExist) {
            new Error.BadRequestError({
                message: "Email is exist!!!!"
            }).send(res)
            return
        }

        const items = await userRepository.create({ ...data, user_email: user_email });

        new CREATED({
            message: "Register success!!!",
            metadata: items
        }).send(res)
    } catch (error) {
        next(error); // sét tiếp controller
    }
};

export const login = async (req: Request<{}, {}, IUser, {}>, res: Response, next: NextFunction) => {
    const { user_email, user_pass } = req.body;
    if (!user_email || !user_pass) {
        new Error.BadRequestError({
            message: "Please provide user_email or user_password "
        }).send(res)
        return;
    }
    try {
        // Tra coi email tồn tại chưa 
        const items = await userRepository.findOne({ user_email });
        if (!items) {
            new Error.UnauthenticatedError({
                message: "User đã tồn tại trong hệ thông",
            }).send(res)
            return;
        }
        //Kiểm tra coi đúng pasword không
        const isValid = await PasswordConfig.comparePassword(items.user_pass, user_pass);
        if (!isValid) {
            new Error.UnauthenticatedError({
                message: "Sai mật khẩu",
            }).send(res)
            return;
        }
        // Tạo token
        const payload = { _id: items._id, user_email: items.user_email }
        const token = JwtConfig.SignJWT(payload);
        // Đăng ký cookie
        CookieConfig.createCookie({ res, token })
        // lấy thông tin user mà bỏ password ra
        const user = await userRepository.findById(items._id).select("-user_pass")
        new OK({
            message: "Login success!!!",
            metadata: { token, user }
        }).send(res)
    } catch (error) {
        next(error)
    }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        CookieConfig.deleteCookie({ res, nameCookie: "token" })
        new OK({
            message: "Logout success!!!"
        }).send(res)
    } catch (error) {
        next(error)
    }

    new OK({
        message: "logout",
    });
};
