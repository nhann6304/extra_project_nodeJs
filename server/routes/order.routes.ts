import express from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { OrderController } from "../controller"


const routes = express.Router()

routes.use(authMiddleware)
routes.post("/create", OrderController.create)
routes.get("/find", OrderController.find)
routes.patch("/update", OrderController.update)
routes.delete("/deleted", OrderController.deleted)

export default routes