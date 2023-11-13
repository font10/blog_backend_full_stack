import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 4
  },
  desc: {
    type: String,
    required: true,
    min: 12
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: true,
  },
  place: {
    type: mongoose.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
}, { timestamps: true })

export default mongoose.model("Blog", blogSchema)

