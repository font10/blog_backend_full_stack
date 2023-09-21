import express from 'express'
import { login, signUp } from '../controllers/auth-controller.js'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)

export default userRouter