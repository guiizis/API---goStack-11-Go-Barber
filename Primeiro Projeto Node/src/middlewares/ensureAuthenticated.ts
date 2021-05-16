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
import appError from "../errors/appError"

export function ensaureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeaderContent = req.headers.authorization

  if (!authHeaderContent) {
    throw new appError("Header Authorization not Found")
  }
  const [, token] = authHeaderContent.split(" ")
  const { secret } = JWTConfig



  const isValidToken = verify(token, secret)
  const { sub } = isValidToken as IValidToken

  req.user = {
    id: sub
  }

  return next()



}
