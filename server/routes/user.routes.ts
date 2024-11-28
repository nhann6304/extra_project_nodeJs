import express, { Request, Response } from "express"
import { UserController } from "../controller";
import { roleMiddleware } from "../middleware/role.middleware";
import { ERole } from "../enums/role.enum";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();


router.post("/create", UserController.create)
router.use(authMiddleware);
router.use(roleMiddleware(ERole.ADMIN, "none"));
router.get("/find", UserController.find)
router.patch("/update", UserController.update)
router.delete("/deleted", UserController.deleted)


export default router