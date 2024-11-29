import express from "express";
import { ReviewController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware);
router.post("/create", ReviewController.create)
router.get("/find", ReviewController.find)
router.patch("/update", ReviewController.update)
router.delete("/deleted", ReviewController.deleted)
export default router