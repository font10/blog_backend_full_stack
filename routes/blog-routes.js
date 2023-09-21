import express from 'express'
import { addBlog, deleteBlog, getFeatured, getAllBlogs, getBlogById, likeBlog, updateBlog } from '../controllers/blog-controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const blogRouter = express.Router()

blogRouter.get('/getAll', getAllBlogs)
blogRouter.get('/featured', getFeatured)
blogRouter.get('/:id', getBlogById)
blogRouter.post('/', verifyToken, addBlog)
blogRouter.put('/:id', verifyToken, updateBlog)
blogRouter.put('/likeBlog/:id', verifyToken, likeBlog)
blogRouter.delete('/:id', verifyToken, deleteBlog)

export default blogRouter