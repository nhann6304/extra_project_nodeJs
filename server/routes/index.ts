import express from "express"
import rtAuth from "./auth.routes"


const router = express.Router()

router.use("/auth", rtAuth);


export default router;