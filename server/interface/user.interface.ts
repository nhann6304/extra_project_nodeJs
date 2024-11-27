import { ERole } from "../enums/role.enum"

export interface IUser {
    _id?: any,
    user_name: string,
    user_email: string,
    user_pass: string
    role: ERole | string
}