import './Player.css'
import API from '../api/axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

function Player() {
  const [videoData, setVideoData] = useState({})
  const [videoURL, setVideoURL] = useState('')
  const { id: videoId } = useParams()

  useEffect(() => {
    const getVideoData = async () => {
      try {
        const res = await API.get(`/videos/${videoId}`)
        if (res.data.status === 'success') {
          setVideoData(res.data.video)
          setVideoURL(
            `http://localhost:5000/api/videos/watch/${res.data.video.videoUrl}`
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    getVideoData()
  }, [])

  return (
    <div className='player-container'>
      <div className='player'>
        <ReactPlayer
          url={videoURL}
          playing={true}
          controls={true}
          width='100%'
          height='56.25%'
        />
      </div>

      <div className='other-videos'>Other videos</div>
    </div>
  )
}

export default Player
