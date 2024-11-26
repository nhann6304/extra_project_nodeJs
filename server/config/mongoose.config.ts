import mongoose from "mongoose";
import 'dotenv/config'


export const connectDb = async () => {
    return await mongoose
        .connect(process.env.MONGOOSE_URL)
        .then(() => console.log("Connect db mongoose success !!"))
        .catch((err) => console.log("connect db mongoose fail!!", err))
}