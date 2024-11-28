import express, { Request, Response } from "express"
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
// import xss from "xss-clean";
import "dotenv/config";
import mainRouter from "./routes/index";
import { connectDb } from "./config/mongoose.config";
import { errorHandlerMiddleware, notFoundMiddleware } from "./middleware/errorHandler.middleware";
import cookieParser from "cookie-parser";

const server = express();
const PORT = 8000

// Config
server.use(cookieParser())
server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(express.urlencoded({ extended: true }));
//Router
server.use("/api/v1/", mainRouter);
//middleware 
server.use(notFoundMiddleware)
server.use(errorHandlerMiddleware)
server.use(cors())

const start = async () => {
    try {
        await connectDb();
        server.listen(process.env.PORT || PORT, () => {
            console.log(`Server has running ${process.env.PORT || PORT}`);
        })
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}
server.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello word</h1>")
});


start()