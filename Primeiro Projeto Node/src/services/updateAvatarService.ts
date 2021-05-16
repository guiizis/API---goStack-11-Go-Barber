import { getRepository } from "typeorm"
import userModel from "../models/Users"
import path from "path"
import uploadConfig from "../config/upload"
import fs from 'fs'
import appError from "../errors/appError"

interface IUpdateAvatarServiceProps {
  user_id: string
  avatar_name: string
}

class updateAvatarService {
  async execute({ user_id, avatar_name }: IUpdateAvatarServiceProps): Promise<userModel> {
    const newUserRepository = getRepository(userModel)

    const isUserValid = await newUserRepository.findOne(user_id)

    if (!isUserValid) {
      throw new appError("The User need to has a account")
    }

    if (isUserValid.avatar) {
      const filePath = path.join(uploadConfig.directory, isUserValid.avatar)
      const userAvatarExists = fs.promises.stat(filePath)

      if (userAvatarExists) {
        await fs.promises.unlink(filePath)
      }
    }

    isUserValid.avatar = avatar_name

    await newUserRepository.save(isUserValid)

    return isUserValid

  }
}

export { updateAvatarService }
