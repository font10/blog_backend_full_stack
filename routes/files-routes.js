import express from 'express'
import { deleteImageById, uploadImages } from '../controllers/files-controller.js'
import { upload } from '../middlewares/multer.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const filesRouter = express.Router()

filesRouter.post('/uploadImages', verifyToken, upload.single('image'), uploadImages)
filesRouter.delete('/delete/:id', verifyToken, deleteImageById)

export default filesRouter