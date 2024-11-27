import mongoose from "mongoose";
import validator from "validator";
import { IUser } from "../interface/user.interface";
import { ERole } from "../enums/role.enum";
import { PasswordConfig } from "../helper/hashPassword.help";

export const userSchema = new mongoose.Schema<IUser>({
    user_name: {
        type: String,
        required: [true, "Please provide name"],
    },

    user_email: {
        type: String,
        required: [true, "Please provide user_email"],
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     'Please provide a valid email',
        // ],
        // validate: {
        //     validator: (email: string) => validator.isEmail(email),
        //     message: 'Invalid email format',
        // },
        unique: true,
    },

    user_pass: {
        type: String,
        required: [true, "Please provide password"],
    },
    role: {
        type: String,
        enum: {
            values: Object.values(ERole),
            message: `{VALUE} không hỗ trợ`
        },
        default: ERole.USER

    }
});

userSchema.methods.getName = function () {
    return this.user_name
}
userSchema.pre("save", async function () {
    this.user_pass = await PasswordConfig.hashPassword(this.user_pass)
})

userSchema.methods.comparePassword = async function (pass_ma_hoa) {
    const isMatch = await PasswordConfig.comparePassword(pass_ma_hoa, this.password);
    return isMatch
}