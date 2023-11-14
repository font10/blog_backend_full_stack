import Blog from '../models/Blog.js'

export const getAllBlogs = async(req, res) => {
  try {
    const blogs = await Blog.find({}).populate('userId', '-password').populate('place')
    res.status(200).json({ blogs })
  } catch(err) {
    return res.status(500).json({ message: err })
  }
}

export const getBlogById = async(req, res) => {
  try {
    const id = req.params.id
    const blog = await Blog.findById(id).populate('userId', '-password').populate('place')

    return res.status(200).json({ blog })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const addBlog = async(req, res) => {
  try {
    const blogAdd = new Blog(req.body)

    if(!blogAdd) {
      return res.status(400).json({ message: 'Error creating blog' })
    }

    const blog = await blogAdd.save();
    
    return res.status(201).json({ message: 'Blog created', blog })
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

export const getLocationsByCountry = async(req, res) => {
  try {
    const countries = await Blog.find({ location: req.query.location })
    
    if(!countries) return res.status(400).json({ message: 'Error finding blogs' })

    return res.status(201).json( countries )
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const getBlogsByPlace = async(req, res) => {
  console.log(req.params)
  try {
    const blogsByPlace = await Blog.find({ place: req.params.place }).populate('place').populate('userId')

    if(!blogsByPlace) {
      return res.status(400).json({ message: 'Error getting blog' })
    }

    return res.status(201).json( blogsByPlace )
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

