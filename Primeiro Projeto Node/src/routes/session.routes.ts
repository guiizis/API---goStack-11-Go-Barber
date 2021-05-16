import { Router } from "express"
import createAuthenticateService from "../services/createAuthenticateService"


const sessionRouter = Router()

sessionRouter.post('/', async (req, res) => {

  const { password, email } = req.body
  const newAuthenticateService = new createAuthenticateService()
  const { user, token } = await newAuthenticateService.execute({ password, email })

  // @ts-expect-error
  delete user.password

  return res.json({ user, token })



})


export default sessionRouter
