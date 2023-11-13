import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './routes/user-routes.js'
import blogRouter from './routes/blog-routes.js'
import placeRouter from './routes/place-routes.js'
import filesRouter from './routes/files-routes.js'

dotenv.config()
const app = express();

//? MongoDB connection
connectDB();

//? Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/place', placeRouter)
app.use('/files', filesRouter)

app.listen(process.env.PORT, () => {
  console.log(`Running on ${process.env.DEV_MODE} mode port on ${process.env.PORT}`)
})