import { Response } from "express";


export class CookieConfig {
    static createCookie({ res, token }: { res: Response, token: string }) {
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            signed: false
        })
    }
    static deleteCookie({ res, nameCookie }: { res: Response, nameCookie: string }) {
        res.clearCookie(nameCookie)
    }
}