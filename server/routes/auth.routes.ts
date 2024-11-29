import express, { Request, Response } from "express"
import { Error } from "../core/error";
import { AuthController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)
router.use(authMiddleware);
router.get("/get-me", AuthController.getMe)
router.post("/update-me", AuthController.updateMe)
router.post("/change-password", AuthController.changePassword)
router.get("/logout", AuthController.logout)


export default router