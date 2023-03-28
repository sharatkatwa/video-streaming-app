const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('express-async-errors')
const cookieParser = require('cookie-parser')

const userRoutes = require('./Routes/userRoutes')
const videoRoutes = require('./Routes/videoRoutes')

app.use('/api/videos/watch', express.static('media/uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)
app.use(cookieParser())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/videos', videoRoutes)

module.exports = app
