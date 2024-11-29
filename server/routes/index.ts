import express from "express"
import rtAuth from "./auth.routes"
import rtUser from "./user.routes"
import rtProduct from "./product.routes"


const router = express.Router()

router.use("/auth", rtAuth);
router.use("/users", rtUser);
router.use("/products", rtProduct);


export default router;