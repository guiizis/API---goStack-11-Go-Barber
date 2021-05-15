import {
  Request, Response, NextFunction
} from "express"

interface IValidToken {
  iat: number,
  exp: number,
  sub: string
}

import { verify } from "jsonwebtoken"
import { JWTConfig } from "../config/auth"

export function ensaureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeaderContent = req.headers.authorization

  if (!authHeaderContent) {
    throw new Error("Header Authorization not Found")
  }
  const [, token] = authHeaderContent.split(" ")
  const { secret } = JWTConfig

  try {

    const isValidToken = verify(token, secret)
    const { sub } = isValidToken as IValidToken

    req.user = {
      id: sub
    }

    return next()

  } catch (error) {
    throw new Error("Invalid JWT Token")
  }

}
