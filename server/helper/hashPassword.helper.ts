import *  as bcrypt from "bcryptjs"
const salt = 10

export class PasswordConfig {
    static async hashPassword(pass_hien_tai: string) {
        const passwordHash = await bcrypt.hash(pass_hien_tai, salt);
        return passwordHash
    }

    static async comparePassword(pass_ma_hoa: string, pass_hien_tai): Promise<boolean> {
        const isMatch = await bcrypt.compare(pass_hien_tai, pass_ma_hoa);
        console.log(isMatch);
        return isMatch
    }
}