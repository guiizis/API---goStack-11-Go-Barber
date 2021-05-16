import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors' //need be imported below express
import appError from '../src/errors/appError'
import { routes } from './routes'

import './database'

import upload from './config/upload'

const app = express()

app.use(express.json())
app.use("/files", express.static(upload.directory))
app.use(routes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof appError) {
    res.status(error.statusCode).json({ message: error.message })
  } else {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

const port = 3333
app.listen(port, () => console.log(`the server is running at port ${port}`))
