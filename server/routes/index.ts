import express from "express"
import rtAuth from "./auth.routes"
import rtUser from "./user.routes"
import rtProduct from "./product.routes"
import rtReview from "./review.routes"
import rtOrder from "./order.routes"


const router = express.Router()

router.use("/auth", rtAuth);
router.use("/users", rtUser);
router.use("/products", rtProduct);
router.use("/reviews", rtReview);
router.use("/orders", rtOrder);


export default router;