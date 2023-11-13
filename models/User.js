import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  image: {
    type: String,
    required: false,
    default: 'https://imgs.search.brave.com/HTUyKk8Vb_9hSWmylY1BXPS4eO5MdJpnjz-4Mx69OFY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMzEzNS8zMTM1/NzE1LnBuZw'
  }
}, { timestamps: true } )

export default mongoose.model("User", userSchema)
