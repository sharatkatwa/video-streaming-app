import './VideoCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const VideoCard = ({ video }) => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const handleHover = () => {
    setHovered(!hovered)
  }

  return (
    <div
      className='video-card'
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={() => navigate(`/${video._id}`)}
    >
      <div className='thumbnail-container'>
        <video
          width='380'
          height='200 '
          className='video'
          src={`http://localhost:5000/api/videos/watch/${video.videoUrl}`}
        />
        <FontAwesomeIcon
          className={`play-icon ${hovered ? 'fade-in' : ''}`}
          icon={faPlay}
          size='2x'
        />
      </div>
      <div className='video-info'>
        <h4 className='video-title'>{video.title}</h4>
        <p className='views-and-data'>Views &#8226; Date</p>
      </div>
    </div>
  )
}

export default VideoCard
