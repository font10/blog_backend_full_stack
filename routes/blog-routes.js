import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog, getBlogsByPlace } from '../controllers/blog-controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const blogRouter = express.Router()

blogRouter.get('/getAll', getAllBlogs)
blogRouter.get('/:id', getBlogById)
blogRouter.get('/place/:place', getBlogsByPlace)
blogRouter.post('/', verifyToken, addBlog)
blogRouter.put('/:id', verifyToken, updateBlog)
blogRouter.delete('/:id', verifyToken, deleteBlog)

export default blogRouter