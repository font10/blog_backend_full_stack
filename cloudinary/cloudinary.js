import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadImage(file) {
  let url = ''
  try {
    await cloudinary.uploader.upload(file.path).then(res => { 
      console.log(res)
      url = { id: res.public_id, url: res.secure_url} 
      deleteImageFromMulter(file)
    })      
  } catch (error) {
    res.status(500).json({ message: error })
  }
  return url
}

export async function deleteImageFromMulter(file) {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error(err)
      return
    }
    return
  })
}

export async function deleteImage(id) {
  const res = await cloudinary.uploader.destroy(id)
  return res
}