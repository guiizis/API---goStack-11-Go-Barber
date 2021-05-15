import { Router } from "express"
import createAuthenticateService from "../services/createAuthenticateService"


const sessionRouter = Router()

sessionRouter.post('/', async (req, res) => {
  try {
    const { password, email } = req.body
    const newAuthenticateService = new createAuthenticateService()
    const { user, token } = await newAuthenticateService.execute({ password, email })

    // @ts-expect-error
    delete user.password

    return res.json({ user, token })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }


})


export default sessionRouter
