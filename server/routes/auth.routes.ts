import express, { Request, Response } from "express"
import { Error } from "../core/error";
import { AuthController } from "../controller";

const router = express.Router();


router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.get("/logout", AuthController.logout)


export default router