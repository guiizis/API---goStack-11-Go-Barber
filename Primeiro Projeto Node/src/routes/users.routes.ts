import { Router } from 'express'
import multer from 'multer'
import uploadConfigs from '../config/upload'
import createUserService from '../services/CreateUserService'
import { ensaureAuthenticated } from "../middlewares/ensureAuthenticated"
import { updateAvatarService } from '../services/updateAvatarService'
const upload = multer(uploadConfigs)
const userRouter = Router()

userRouter.post("/", async (req, res) => {


  const { password, email, name } = req.body
  const createNewUserService = new createUserService()

  const newUserSaved = await createNewUserService.execute({ password, email, name })

  // @ts-expect-error
  delete newUserSaved.password

  res.json(newUserSaved)


})

userRouter.patch
  ("/avatar", ensaureAuthenticated, upload.single('avatar'), async (req, res) => {


    const avatar_name = req.file.filename

    const newAvatarUpdateService = new updateAvatarService()

    const newAvatarUpdated = await newAvatarUpdateService.execute({ user_id: req.user.id, avatar_name })
    // @ts-expect-error
    delete newAvatarUpdated.password

    res.json(newAvatarUpdated)


  })

export default userRouter
