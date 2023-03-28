const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      require: true,
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)
const Video = mongoose.model('Videos', VideoSchema)
module.exports = Video
