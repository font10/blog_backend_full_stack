import express from 'express'
import { login, signUp } from '../controllers/auth-controller.js'
import { editUser } from '../controllers/user-controller.js'
//import { verifyToken } from '../middlewares/verifyToken.js'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.patch('/:id', editUser)

export default userRouter