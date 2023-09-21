import mongoose from 'mongoose'

const connectDB = async () => {
  try { 
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to MongoDB ${conn.connection.host}`)
  } catch(err) {
    console.log(`MONGO connect error`)
  }
}

export { connectDB }