import { getRepository } from "typeorm"
import { hash } from "bcryptjs"
import createUser from "../models/Users"

interface ICreateUser {
  email: string,
  name: string,
  password: string
}

class createUserService {
  async execute({ email, name, password }: ICreateUser): Promise<createUser> {
    const userRepository = getRepository(createUser)

    const emailAlreadyUser = await userRepository.findOne({ where: { email } })

    if (emailAlreadyUser) {
      throw new Error("This Email is Already in Use")
    }
    const hashedPassword = await hash(password, 8)
    const createNewUser = userRepository.create({ email, name, password: hashedPassword }) //criando instancia para salvar novo objeto
    const saveNewUser = await userRepository.save(createNewUser)



    return saveNewUser
  }
}

export default createUserService
