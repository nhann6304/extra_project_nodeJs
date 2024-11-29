import express from "express"
import { ProductController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { ERole } from "../enums/role.enum";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(ERole.ADMIN, "none"));
router.post("/create", ProductController.create)
router.get("/find", ProductController.find)
router.get("/update", ProductController.update)
router.get("/deleted", ProductController.deleted)

export default router