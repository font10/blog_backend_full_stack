import { uploadImage, deleteImage } from '../cloudinary/cloudinary.js'

export const uploadImages = async(req, res) => {
  console.log(req.body)
  console.log(req.file)
  try {
    const images = await uploadImage(req.file)
    res.status(200).json({ message: 'Image uploaded successfully', images })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const deleteImageById = async(req, res) => {
  const { result } = await deleteImage(req.params.id)
  if( result === 'ok') res.status(200).json({ message: 'Deleted successfully' })
  else res.status(500).json({ message: 'Error deleting the image' })
}
