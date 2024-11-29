import express from "express"
import { ProductController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { ERole } from "../enums/role.enum";

const router = express.Router();

router.use(authMiddleware);
router.get("/find", ProductController.find)
router.use(roleMiddleware(ERole.ADMIN, "none"));
router.post("/create", ProductController.create)
router.patch("/update", ProductController.update)
router.delete("/deleted", ProductController.deleted)

export default router