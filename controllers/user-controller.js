export const editUser = async(req, res) => {
  try {
    const { id } = req.params
    const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body)
    
    if(!updateUser) {
      return res.status(400).json({ message: 'Error updating user' })
    }

    return res.status(200).json({ message: 'Updated successfully' })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}