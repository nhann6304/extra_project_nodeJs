import express, { Request, Response } from "express"
import { UserController } from "../controller";

const router = express.Router();


router.post("/create", UserController.create)
router.get("/find", UserController.find)
router.patch("/update", UserController.update)
router.delete("/deleted", UserController.deleted)


export default router