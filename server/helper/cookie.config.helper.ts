import { Response } from "express";


export class CookieConfig {
    static createCookie({ res, token }: { res: Response, token: string }) {
        res.cookie("token", token, {
            maxAge: 5 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set true nếu đang trên môi trường production với HTTPS
            signed: false // Tạm thời tắt "signed" nếu không cần
        });
    }
    static deleteCookie({ res, nameCookie }: { res: Response, nameCookie: string }) {
        res.clearCookie(nameCookie)
    }
}