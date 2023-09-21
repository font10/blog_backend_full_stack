import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './routes/user-routes.js'
import blogRouter from './routes/blog-routes.js'

dotenv.config()
const app = express();

//? MongoDB connection
connectDB();

//? Middlewares
app.use(express.json())
app.use(cors())
app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.use("/", (req, res, next) => {
  res.send("<h1>Hi</h1>")
})

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.DEV_MODE} mode port on ${process.env.PORT}`)
})