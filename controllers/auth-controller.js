import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp = async(req, res, next) => {
  try {
    const { username, email, password } = req.body
    
    //? Comprobar campos
    if ( !username && !email && !password ) {
      return res.status(422).json({ message: 'Invalid inputs' })
    }
    
    //? Si existe el usuario
    const existingUser = await User.findOne({ email })
    if(existingUser) {
      return res.status(401).send({ message: 'User already exists' })
    }
    
    //? Encriptar pass
    const hashedPass = await bcrypt.hashSync(password)  

    //? Crear json del nuevo usuario
    const newUser = new User({ username, email, password: hashedPass })
    
    await newUser.save()
    
    if(!newUser) res.status(500).json({ message: 'Unexpected error occurred' })
    return res.status(201).json({ message: 'Register successfully', newUser })
  } catch(err) {
    return res.status(500).json({ message: err })
  }
}

export const login = async(req, res, next) => {
  try {
    const { email, password } = req.body

    //? Comprobar campos
    if ( !email && !password ) {
      return res.status(422).json({ message: 'Invalid inputs' })
    }

    //? Si existe el usuario
    const existingUser = await User.findOne({ email })
    if(!existingUser) {
      return res.status(404).send({ message: 'User not exists' })
    }

    //? Comparar passwords
    const comparePassword = await bcrypt.compare(password, existingUser.password)
  
    if(!comparePassword) {
      return res.status(400).json({ message: "Password incorrect" })
    }
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ user: existingUser }, "secret", {
      expiresIn: "1d"
    })  
    
    return res.status(200).json({ message: 'Login successfully', user: existingUser, token })
  } catch (err) {
    return res.status(500).json({ message: err})
  }
}
