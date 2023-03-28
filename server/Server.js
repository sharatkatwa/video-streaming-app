const app = require('./App')
require('dotenv').config()
const connectDB = require('./db/connectDB')

const port = process.env.PORT || 5000

const connect = async () => {
  await connectDB()
}

connect().then(() => {
  app.listen(port, () => {
    console.log(`server is lisning at: http://localhost:${port}`)
  })
})
