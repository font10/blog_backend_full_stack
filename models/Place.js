import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true } )

export default mongoose.model("Place", placeSchema)
