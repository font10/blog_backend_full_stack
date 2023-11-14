import Place from "../models/Place.js"

export const getPlaces = async(req, res) => {
  try {
    const places = await Place.find({})
    return res.status(201).json( places )
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const getPlaceById = async(req, res) => {
  try {
    console.log(req.params)
    const id = req.params.id
    const place = await Place.findById(id).populate('place')

    return res.status(200).json({ place })
  } catch (err) {
    return res.status(500).json({ message: err })
  }  
}

export const addPlace = async(req, res) => {
  try {
    const placeAdd = new Place(req.body)

    if(!placeAdd) {
      return res.status(400).json({ message: 'Error creating new place' })
    }
    
    const blog = await placeAdd.save();
    
    return res.status(201).json({ message: 'Created successfully', blog })
  } catch(err) {
    return res.status(500).json({ message: err })
  }
}

export const updatePlace = async(req, res) => {
  try {
    const id = req.params.id
    
    const blog = await Place.findByIdAndUpdate({ _id: id }, req.body )

    if(!blog) {
      return res.status(400).json({ message: 'Error updating place' })
    }

    return res.status(200).json({ message: 'Updated successfully' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

export const deletePlace = async(req, res) => {
  try {
    const id = req.params.id
    const findBlog = await Place.findByIdAndDelete(id)

    if(!findBlog) {
      return res.status(400).json({ message: 'Error ocurred when deleting' })
    }
    
    return res.status(200).json({ message: 'Delete successfully' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}