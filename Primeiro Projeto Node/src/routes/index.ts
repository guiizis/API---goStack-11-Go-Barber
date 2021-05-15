import { Router } from "express"
import appointRouter from "../routes/appointments.routes"
import createUserRouter from "../routes/users.routes"
import sessionRouter from "../routes/session.routes"


const routes = Router()

routes.use("/appointment", appointRouter)
routes.use("/user", createUserRouter)
routes.use("/session", sessionRouter)

export { routes }


