const express = require('express')
router = express.Router()
const authControllers = require('../Controllers/authController')
const videoControllers = require('../Controllers/videoController')

router.route('/getAllVideos').get(videoControllers.getAllVideos)
router.route('/watch/:id').get(videoControllers.watchVideo)
router.route('/:id').get(videoControllers.getVideo)
router
  .route('/upload')
  .post(
    authControllers.verifyToken,
    videoControllers.uploadVideo,
    videoControllers.saveVideoData
  )
module.exports = router
