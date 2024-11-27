import express from "express"
import rtAuth from "./auth.routes"
import rtUser from "./user.routes"


const router = express.Router()

router.use("/auth", rtAuth);
router.use("/users", rtUser);


export default router;