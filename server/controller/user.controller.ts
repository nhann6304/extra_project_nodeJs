import { NextFunction, Request, Response } from "express";
import { OK } from "../core/success/success.reponse";


export const create = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "Create"
    })
}


export const find = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "Find"
    })
}


export const update = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "Update"
    })
}


export const deleted = (req: Request, res: Response, next: NextFunction) => {
    new OK({
        message: "Deleted"
    })
}
