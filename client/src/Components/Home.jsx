import './Home.css'
import API from '../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import VideoCard from './VideoCard'

const Home = () => {
  const navigate = useNavigate()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await API.get('/videos/getAllVideos')
        // console.log(res.data.data)
        setVideos(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getVideos()
  }, [])

  return (
    <div className='home-container'>
      <div className='video-card-container'>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <div className='upload-icon' onClick={() => navigate('/upload')}>
        <FontAwesomeIcon icon={faCirclePlus} size='4x' />
      </div>
    </div>
  )
}

export default Home
