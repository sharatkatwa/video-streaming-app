const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.set('strictQuery', false).connect(process.env.MONGO_URI)
    console.log('DB connection successful')
  } catch (err) {
    console.log(err)
  }
}
module.exports = connectDB
