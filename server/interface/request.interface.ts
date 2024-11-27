import { Request } from "express";
import { IUser } from "./user.interface";

export interface CustomRequest<param = any, res = any, req = any, query = any> extends Request<param, res, req, query> {
    user?: IUser
}
