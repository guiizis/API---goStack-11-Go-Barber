import { Router } from 'express'
import createUserService from '../services/CreateUserService'
import { ensaureAuthenticated } from "../middlewares/ensureAuthenticated"
const userRouter = Router()

userRouter.post("/", async (req, res) => {

  try {
    const { password, email, name } = req.body
    const createNewUserService = new createUserService()

    const newUserSaved = await createNewUserService.execute({ password, email, name })

    // @ts-expect-error
    delete newUserSaved.password

    res.json(newUserSaved)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }

})

userRouter.put("/avatar", ensaureAuthenticated, async (req, res) => {
  res.send()
})

export default userRouter