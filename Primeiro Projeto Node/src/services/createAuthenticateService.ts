
import userModel from "../models/Users"
import { getRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { JWTConfig } from "../config/auth"

interface ICreateAuthenticateProps {
  email: string
  password: string
}

interface IUserToReturn {
  user: userModel,
  token: string
}

class createAuthenticateService {
  async execute({ email, password }: ICreateAuthenticateProps): Promise<IUserToReturn> {
    const userRepository = getRepository(userModel)

    const isUserValid = await userRepository.findOne({ where: { email } })

    if (!isUserValid) {
      throw new Error("The Email or the Password is Invalid")
    }
    const isPasswordValid = await compare(password, isUserValid.password)

    if (!isPasswordValid) {
      throw new Error("The Email or the Password is Invalid")
    }

    const { secret, authExpireLimit } = JWTConfig

    const token = sign({}, secret, {
      subject: isUserValid.id,
      expiresIn: authExpireLimit
    })

    return {
      user: isUserValid,
      token
    }
  }
}

export default createAuthenticateService
