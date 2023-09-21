import Blog from '../models/Blog.js'

export const getAllBlogs = async(req, res) => {
  try {
    const blogs = await Blog.find({})
    res.status(200).json({ blogs })
  } catch(err) {
    return res.status(500).json({ message: err })
  }
}



export const getBlogById = async(req, res) => {
  try {
    const id = req.params.id
    const blog = await Blog.findById(id).populate('userId', '-password')

    return res.status(200).json({ blog })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const getFeatured = async(req, res) => {
  try {
    const blogs = await Blog.find({ featured: true }).populate("userId", '-password').limit(3)
    return res.status(200).json(blogs)
  } catch (error) {
      return res.status(500).json(error)
  }
}

export const addBlog = async(req, res) => {
  try {
    const blogAdd = new Blog(req.body)
    if(!blogAdd) {
      return res.status(400).json({ message: 'Error creating blog' })
    }
    const blog = await blogAdd.save();
    return res.status(201).json({ blog })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const deleteBlog = async(req, res) => {
  try {
    const id = req.params.id
    const findBlog = await Blog.findByIdAndDelete(id)

    if(!findBlog) {
      return res.status(400).json({ message: 'Error ocurred when deleting' })
    }
    
    return res.status(200).json({ message: 'Delete successfully' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const updateBlog = async(req, res) => {
  try {
    const id = req.params.id
    
    const blog = await Blog.findByIdAndUpdate({ _id: id }, req.body ).populate('userId', '-password')

    if(!blog) {
      return res.status(400).json({ message: 'Error updating blog' })
    }

    return res.status(200).json({ message: 'Updated successfully' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const likeBlog = async(req, res) => {
  try {
    const id = req.params.id
    const blog = await Blog.findById(id)
    console.log()
    if(blog.likes.includes(id)){
        blog.likes = blog.likes.filter((userId) => userId !== id)
        await blog.save()

        return res.status(200).json({msg: 'Successfully unliked the blog'})
    } else {
        blog.likes.push(req.user.id)
        await blog.save()

        return res.status(200).json({msg: "Successfully liked the blog"})
    }
  } catch (err) {
      return res.status(500).json({ message: err })
  }
}